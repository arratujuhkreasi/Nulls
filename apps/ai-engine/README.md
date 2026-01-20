---
title: SaaS ERP AI Engine
emoji: 🚀
colorFrom: indigo
colorTo: purple
sdk: docker
pinned: false
license: mit
---

# SaaS ERP AI Engine

AI-powered backend for sales forecasting, marketing content generation, and WhatsApp chatbot.

## Features
- 📊 Sales Forecasting with LSTM
- 🤖 WhatsApp RAG Chatbot
- ✨ AI Marketing Copy Generator

## Tech Stack
- FastAPI
- TensorFlow
- Groq AI (Llama3)
- PostgreSQL

## API Endpoints

### Health Check
```
GET /health
```

### Sales Forecast
```
POST /predict
```

### Marketing Generator
```
POST /marketing/generate
```

### WhatsApp Chat
```
POST /chat/webhook
```

## Environment Variables Required
- `GROQ_API_KEY`: Your Groq API key
- `DATABASE_URL`: PostgreSQL connection string

Visit the API documentation at `/docs` for interactive testing.
