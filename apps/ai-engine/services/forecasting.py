import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import LSTM, Dense, Dropout
from sklearn.preprocessing import MinMaxScaler
import joblib
import os

# Configuration
LOOKBACK = 30
MODELS_DIR = "models"

if not os.path.exists(MODELS_DIR):
    os.makedirs(MODELS_DIR)

def get_model_path(user_id: str):
    return os.path.join(MODELS_DIR, f"model_{user_id}.h5")

def get_scaler_path(user_id: str):
    return os.path.join(MODELS_DIR, f"scaler_{user_id}.pkl")

def preprocess_data(data: list):
    """
    Convert raw data to a clean, date-indexed Series with missing dates filled with 0.
    Input: [{"date": "2023-01-01", "amount": 100}, ...]
    """
    df = pd.DataFrame(data)
    if 'date' not in df.columns or 'amount' not in df.columns:
        raise ValueError("Data must include 'date' and 'amount' columns")

    # Convert date and sort
    df['date'] = pd.to_datetime(df['date'])
    df = df.sort_values('date')
    df = df.set_index('date')

    # Handle duplicates: Sum amount for same day
    df = df.groupby(df.index).sum()

    # Fill missing dates with 0
    full_range = pd.date_range(start=df.index.min(), end=df.index.max(), freq='D')
    df = df.reindex(full_range, fill_value=0)

    return df['amount'].values.reshape(-1, 1).astype('float32')

def create_sequences(data, lookback):
    X, y = [], []
    for i in range(len(data) - lookback):
        X.append(data[i:i + lookback])
        y.append(data[i + lookback])
    return np.array(X), np.array(y)

def build_and_train_model(user_id: str, raw_data: list):
    """
    Train a production-ready LSTM model for a specific user.
    """
    # 1. Preprocess
    values = preprocess_data(raw_data)

    if len(values) < LOOKBACK + 10:
        raise ValueError(f"Insufficient data. Need at least {LOOKBACK + 10} days (continuous).")

    # 2. Normalize
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_values = scaler.fit_transform(values)

    # 3. Create Sequences
    X, y = create_sequences(scaled_values, LOOKBACK)

    # 4. Build Architecture
    # 1 Layer LSTM (50 units, relu) -> Dropout (0.2) -> Dense (1)
    model = Sequential()
    model.add(LSTM(50, activation='relu', input_shape=(LOOKBACK, 1)))
    model.add(Dropout(0.2))
    model.add(Dense(1))

    model.compile(optimizer='adam', loss='mse')

    # 5. Train
    model.fit(X, y, epochs=50, batch_size=32, verbose=0)

    # 6. Save Artifacts
    model.save(get_model_path(user_id))
    joblib.dump(scaler, get_scaler_path(user_id))
    
    return {"status": "success", "message": f"Model trained for user {user_id}"}

def predict_recursive(user_id: str, last_30_days: list):
    """
    Recursive 7-day prediction.
    """
    model_path = get_model_path(user_id)
    scaler_path = get_scaler_path(user_id)

    if not os.path.exists(model_path) or not os.path.exists(scaler_path):
        raise FileNotFoundError(f"No trained model found for user {user_id}. Please train first.")

    # Load artifacts
    model = load_model(model_path)
    scaler = joblib.load(scaler_path)

    # Validate Input
    if len(last_30_days) != LOOKBACK:
         if len(last_30_days) > LOOKBACK:
             last_30_days = last_30_days[-LOOKBACK:]
         else:
             raise ValueError(f"Input must contain at least {LOOKBACK} data points.")

    # Prepare Input
    input_values = np.array(last_30_days).reshape(-1, 1).astype('float32')
    
    # Scale Input (transform using the trained scaler)
    current_batch = scaler.transform(input_values) # Shape (30, 1)
    
    # Reshape for LSTM [1, 30, 1]
    current_batch = current_batch.reshape(1, LOOKBACK, 1)

    predicted_values = []

    # Recursive Prediction Loop
    for _ in range(7):
        # Predict next step
        next_pred_scaled = model.predict(current_batch, verbose=0) # Shape (1, 1)
        
        # Store prediction (scaled)
        predicted_values.append(next_pred_scaled[0, 0])
        
        # Update batch: remove first, add new prediction
        new_step = next_pred_scaled.reshape(1, 1, 1)
        current_batch = np.append(current_batch[:, 1:, :], new_step, axis=1)

    # Inverse Transform to get Rupiah/Real values
    predicted_values_reshaped = np.array(predicted_values).reshape(-1, 1)
    final_predictions = scaler.inverse_transform(predicted_values_reshaped)
    
    # Return as list of standard floats
    return [float(x[0]) for x in final_predictions]
