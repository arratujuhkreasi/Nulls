import os
from groq import Groq

# Initialize Groq client
client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)

def generate_marketing_copy(product_name: str, platform: str, tone: str, description: str = "") -> str:
    """
    Generates marketing copy using Llama 3 via Groq.
    """
    
    prompt = f"""
    Internal Monologue: You are an expert Digital Marketer and Copywriter in Indonesia.
    Task: Write a high-converting {platform} post for the product '{product_name}'.
    Tone: {tone}
    Context/Details: {description}
    Language: Bahasa Indonesia (Gaul/Formal depending on tone)
    
    Requirements:
    - Use relevant emojis.
    - Include 3-5 relevant hashtags at the bottom (e.g. #fyp #viral).
    - Format it beautifully for reading.
    - If it's Instagram/TikTok, make it catchy (bisa pakai bahasa santai/gaul).
    - If it's Email, sound professional but engaging.
    - STRICTLY OUTPUT IN BAHASA INDONESIA ONLY.
    
    Output only the copy content.
    """

    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are a world-class copywriter specializing in viral marketing posts for Indonesian audience (UMKM).",
                },
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="llama-3.3-70b-versatile",
            temperature=0.7,
            max_tokens=500,
        )

        return chat_completion.choices[0].message.content
    except Exception as e:
        print(f"Error generating copy: {e}")
        # Return the actual error for debugging
        return f"Error details: {str(e)}"
