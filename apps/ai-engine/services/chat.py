import os
from groq import Groq
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

# Configuration
# Strict environment validation - no defaults for security
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError(
        "DATABASE_URL environment variable is required. "
        "Please set it in your .env file with your PostgreSQL connection string."
    )

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise ValueError(
        "GROQ_API_KEY environment variable is required. "
        "Get your API key from https://console.groq.com/"
    )

# Setup DB
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_user_id_from_phone(phone_number: str, db):
    """
    Identify user ID based on sender's phone number.
    Assumes 'profiles' or 'users' table has phone_number check.
    For this MVP, we return a mock ID if not found or DB fails.
    """
    try:
        # Example query: 
        # result = db.execute(text("SELECT id FROM profiles WHERE phone = :phone"), {"phone": phone_number}).fetchone()
        # if result: return result[0]
        pass
    except Exception as e:
        print(f"DB Error looking up user: {e}")
    
    # Mock fallback for demo
    return "user-uuid-1234-5678"

def get_product_context(user_id: str, message: str, db):
    """
    Search products relevant to the message.
    """
    products_context = "No specific product data found."
    
    try:
        # Simple extraction: split message and check for keywords
        # In prod, use Vector Search (pgvector) for semantic matching
        keywords = [word for word in message.split() if len(word) > 3]
        
        if not keywords:
            return "All Products Summary or Top Items"

        # Build dynamic ILIKE query
        conditions = []
        params = {"user_id": user_id}
        for i, word in enumerate(keywords):
            key = f"word_{i}"
            conditions.append(f"name ILIKE :{key}")
            params[key] = f"%{word}%"
        
        where_clause = " OR ".join(conditions)
        sql = text(f"SELECT name, stock, sell_price FROM products WHERE user_id = :user_id AND ({where_clause})")
        
        results = db.execute(sql, params).fetchall()
        
        if results:
            products_list = [f"- {r[0]}: Stock {r[1]}, Price {r[2]}" for r in results]
            products_context = "\n".join(products_list)
        else:
            products_context = "No matching products found in inventory."
            
    except Exception as e:
        print(f"DB Error searching products: {e}")
        # Mock Context
        if "keripik" in message.lower():
            products_context = "- Keripik Pisang: Stock 5 pcs\n- Keripik Singkong: Stock 50 pcs"
    
    return products_context

def generate_ai_response(user_query: str, context: str):
    """
    Call Groq API to generate response.
    """
    try:
        client = Groq(api_key=GROQ_API_KEY)
        
        system_prompt = (
            "You are a helpful and friendly Inventory & Sales Assistant for an MSME (UMKM). "
            "Use the provided database context to answer the user's question about stock, price, or sales. "
            "If stock is low (< 10), suggest restocking. "
            "Keep answers concise and suitable for WhatsApp."
        )
        
        user_prompt = f"""
        User Message: "{user_query}"
        
        Database Context:
        {context}
        
        Answer:
        """
        
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            model="llama-3.3-70b-versatile", # or mixtral-8x7b-32768
            temperature=0.7,
            max_tokens=300,
        )
        
        return chat_completion.choices[0].message.content
        
    except Exception as e:
        print(f"Groq API Error: {e}")
        return "Sorry, my AI brain is sleeping. Here is the raw data: " + context

def process_chat_message(payload: dict):
    """
    Main orchestration function.
    """
    sender = payload.get("from_number")
    message = payload.get("message_body")
    
    if not sender or not message:
        return {"status": "error", "message": "Invalid payload"}
    
    db = SessionLocal()
    try:
        # 1. Identify User
        user_id = get_user_id_from_phone(sender, db)
        
        # 2. Get Context (RAG)
        context = get_product_context(user_id, message, db)
        
        # 3. Generate Answer
        ai_reply = generate_ai_response(message, context)
        
        # 4. Simulate Sending (In prod: Call WhatsApp API)
        print(f">>> SENDING TO {sender}: {ai_reply}")
        
        return {
            "status": "success",
            "reply": ai_reply,
            "context_used": context
        }
    finally:
        db.close()
