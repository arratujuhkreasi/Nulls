from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any, Union
# Import from updated forecasting service
from services.forecasting import build_and_train_model, predict_recursive
from services.chat import process_chat_message

app = FastAPI(title="SaaS ERP AI Engine (Production Ready)")

class TrainingDataPoint(BaseModel):
    date: str
    amount: float

class TrainRequest(BaseModel):
    user_id: str
    data: List[TrainingDataPoint]

class PredictionRequest(BaseModel):
    user_id: str
    data: List[float] # Expecting last 30 float values

class ChatMessage(BaseModel):
    from_number: str
    message_body: str

@app.get("/")
def read_root():
    return {"message": "AI Engine is running"}

@app.post("/train")
def train_model(payload: TrainRequest):
    """
    Trigger model training for a specific user.
    Payload: {"user_id": "123", "data": [{"date": "...", "amount": 100}, ...]}
    """
    try:
        # Convert Pydantic models to list of dicts/values
        data = [item.dict() for item in payload.data]
        result = build_and_train_model(payload.user_id, data)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/predict")
def predict_forecast(payload: PredictionRequest):
    """
    Predict next 7 days for a specific user.
    Payload: {"user_id": "123", "data": [val1, val2, ..., val30]}
    """
    try:
        predictions = predict_recursive(payload.user_id, payload.data)
        return {"forecast": predictions}
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Model not found for this user. Please train first.")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/chat-webhook")
def chat_webhook(payload: ChatMessage):
    """
    Handle WhatsApp Incoming Webhooks.
    Payload: {"from_number": "+62...", "message_body": "Stok..."}
    """
    try:
        result = process_chat_message(payload.dict())
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
