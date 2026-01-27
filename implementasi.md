# 📊 Implementation Plan: Nulls SaaS ERP - Cash Flow Prediction

## 1. Overview

**Tujuan:** Membangun layanan **Cash Flow Prediction** menggunakan model LSTM untuk memprediksi Net Cash Flow 7 hari ke depan berdasarkan data historis transaksi.

**Manfaat untuk UMKM:**
- Antisipasi kekurangan kas (cash shortage)
- Perencanaan pembayaran supplier lebih baik
- Keputusan bisnis berbasis data

---

## 2. Tech Stack

| Komponen | Teknologi |
|----------|-----------|
| **ML Framework** | TensorFlow/Keras |
| **Backend API** | FastAPI (Python 3.9+) |
| **Data Processing** | Pandas, NumPy, Scikit-Learn |
| **Database** | PostgreSQL (Supabase) |
| **Serialization** | Pickle (Scaler), HDF5/Keras (Model) |

---

## 3. Project Structure

```text
/apps/ai-engine/
├── main.py                 # FastAPI Application
├── models/
│   ├── lstm_cashflow.keras # Trained LSTM Model
│   └── scaler.pkl          # MinMaxScaler Object
├── services/
│   ├── preprocessing.py    # Data preprocessing functions
│   ├── training.py         # Model training logic
│   └── forecasting.py      # Prediction/inference logic
├── data/
│   └── dummy_cashflow.csv  # Sample training data
├── requirements.txt
└── Dockerfile
```

---

## 4. Data Structure

### 4.1 Input Data Format (CSV)

| Column | Type | Description |
|--------|------|-------------|
| `date` | DATE | Tanggal transaksi |
| `total_income` | FLOAT | Total pemasukan harian |
| `total_expense` | FLOAT | Total pengeluaran harian |
| `net_cash_flow` | FLOAT | Income - Expense |

### 4.2 Dummy Data Generation

```python
def generate_dummy_data(days: int = 365) -> pd.DataFrame:
    """Generate 1 year of daily financial records with seasonality."""
    dates = pd.date_range(end=datetime.today(), periods=days, freq='D')
    
    # Base values with weekly seasonality
    base_income = 5_000_000  # Rp 5 juta/hari
    base_expense = 3_500_000  # Rp 3.5 juta/hari
    
    income = base_income + np.sin(np.arange(days) * 2 * np.pi / 7) * 1_000_000
    expense = base_expense + np.random.normal(0, 500_000, days)
    
    return pd.DataFrame({
        'date': dates,
        'total_income': income + np.random.normal(0, 300_000, days),
        'total_expense': expense,
        'net_cash_flow': income - expense
    })
```

---

## 5. Preprocessing Pipeline

### 5.1 Normalization

```python
from sklearn.preprocessing import MinMaxScaler

scaler = MinMaxScaler(feature_range=(0, 1))
scaled_data = scaler.fit_transform(data[['net_cash_flow']])
```

### 5.2 Sliding Window Function

```python
def create_sequences(data: np.ndarray, lookback: int = 30) -> tuple:
    """Create input sequences for LSTM.
    
    Args:
        data: Normalized time series data
        lookback: Number of past days to use (default: 30)
    
    Returns:
        X: Shape (samples, lookback, 1)
        y: Shape (samples, 1)
    """
    X, y = [], []
    for i in range(lookback, len(data)):
        X.append(data[i - lookback:i])
        y.append(data[i])
    return np.array(X), np.array(y)
```

### 5.3 Train/Test Split

```python
train_size = int(len(sequences) * 0.8)
X_train, X_test = X[:train_size], X[train_size:]
y_train, y_test = y[:train_size], y[train_size:]
```

---

## 6. LSTM Model Architecture

```python
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout

def build_model(lookback: int = 30) -> Sequential:
    """Build LSTM model for cash flow prediction."""
    model = Sequential([
        LSTM(64, return_sequences=True, input_shape=(lookback, 1)),
        Dropout(0.2),
        LSTM(32, return_sequences=False),
        Dropout(0.2),
        Dense(16, activation='relu'),
        Dense(1)
    ])
    
    model.compile(
        optimizer='adam',
        loss='mse',
        metrics=['mae']
    )
    
    return model
```

### 6.1 Training Configuration

```python
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint

callbacks = [
    EarlyStopping(
        monitor='val_loss',
        patience=10,
        restore_best_weights=True
    ),
    ModelCheckpoint(
        'models/lstm_cashflow.keras',
        save_best_only=True
    )
]

history = model.fit(
    X_train, y_train,
    epochs=100,
    batch_size=32,
    validation_split=0.2,
    callbacks=callbacks,
    verbose=1
)
```

---

## 7. FastAPI Endpoints

### 7.1 Prediction Endpoint

```python
@app.post("/api/predict/cashflow")
async def predict_cashflow(request: CashFlowRequest):
    """Predict next 7 days of cash flow.
    
    Input: Last 30 days of net_cash_flow values
    Output: Predicted values for next 7 days
    """
    if len(request.data) < 30:
        raise HTTPException(400, "Minimum 30 data points required")
    
    # Preprocess
    input_data = np.array(request.data[-30:]).reshape(-1, 1)
    scaled_input = scaler.transform(input_data)
    
    # Recursive prediction for 7 days
    predictions = []
    current_sequence = scaled_input.reshape(1, 30, 1)
    
    for _ in range(7):
        pred = model.predict(current_sequence, verbose=0)
        predictions.append(pred[0, 0])
        # Slide window
        current_sequence = np.roll(current_sequence, -1)
        current_sequence[0, -1, 0] = pred[0, 0]
    
    # Inverse transform
    predictions = scaler.inverse_transform(
        np.array(predictions).reshape(-1, 1)
    )
    
    return {
        "predictions": predictions.flatten().tolist(),
        "dates": [
            (datetime.today() + timedelta(days=i+1)).isoformat()
            for i in range(7)
        ],
        "confidence": 0.85
    }
```

### 7.2 API Response Schema

```json
{
    "predictions": [1500000, 1200000, 1800000, ...],
    "dates": ["2026-01-28", "2026-01-29", ...],
    "confidence": 0.85
}
```

---

## 8. Dependencies

```text
# requirements.txt
fastapi==0.109.0
uvicorn[standard]==0.27.0
tensorflow==2.15.0
scikit-learn==1.4.0
pandas==2.2.0
numpy==1.26.3
python-multipart==0.0.6
pydantic==2.5.3
joblib==1.3.2
```

---

## 9. Deployment

### 9.1 Docker Configuration

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### 9.2 Environment Variables

```env
MODEL_PATH=models/lstm_cashflow.keras
SCALER_PATH=models/scaler.pkl
LOG_LEVEL=INFO
```

---

## 10. Expected Performance

| Metric | Target | Actual |
|--------|--------|--------|
| **MAE** | < Rp 500,000 | TBD |
| **MAPE** | < 15% | TBD |
| **Inference Time** | < 100ms | TBD |
| **Confidence** | 85-95% | TBD |

---

## 11. Next Steps

- [ ] Train model dengan data produksi
- [ ] A/B testing dengan user UMKM
- [ ] Integrasi dengan dashboard Next.js
- [ ] Tambahkan multi-variate prediction (income + expense)