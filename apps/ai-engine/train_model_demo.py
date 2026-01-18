import requests
import random
from datetime import datetime, timedelta
import json

# Configuration
API_URL = "http://localhost:8000"
USER_ID = "demo-user"

def generate_mock_data(days=60):
    data = []
    today = datetime.now()
    base_sales = 3000
    
    for i in range(days):
        date = (today - timedelta(days=(days - i))).strftime("%Y-%m-%d")
        
        # Add some seasonality/trend
        trend = i * 50 
        noise = random.randint(-500, 1500)
        
        # Simulate weekend dip
        is_weekend = (today - timedelta(days=(days - i))).weekday() >= 5
        weekend_factor = 0.8 if is_weekend else 1.0
        
        daily_sales = (base_sales + trend + noise) * weekend_factor
        
        data.append({
            "date": date,
            "amount": max(0, round(daily_sales, 2))
        })
    return data

def train_demo_model():
    print(f"Generating mock data for user: {USER_ID}...")
    training_data = generate_mock_data(60)
    
    payload = {
        "user_id": USER_ID,
        "data": training_data
    }
    
    print(f"Sending {len(training_data)} days of data to AI Engine...")
    
    try:
        response = requests.post(f"{API_URL}/train", json=payload)
        if response.status_code == 200:
            print("\n[SUCCESS] Training Successful!")
            print(json.dumps(response.json(), indent=2))
        else:
            print(f"\n[ERROR] Training Failed: {response.status_code}")
            print(response.text)
            
    except Exception as e:
        print(f"\n[ERROR] Connection Error: {e}")
        print("Make sure the AI Engine is running using 'python main.py'")

if __name__ == "__main__":
    train_demo_model()
