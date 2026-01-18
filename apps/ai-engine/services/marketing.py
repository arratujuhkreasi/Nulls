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
    Internal Monologue: You are an expert Digital Marketer and Copywriter.
    Task: Write a high-converting {platform} post for the product '{product_name}'.
    Tone: {tone}
    Context/Details: {description}
    
    Requirements:
    - Use relevant emojis.
    - Include 3-5 relevant hashtags at the bottom.
    - Format it beautifully for reading.
    - If it's Instagram/TikTok, make it catchy.
    - If it's Email, sound professional but engaging.
    
    Output only the copy content.
    """

    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are a world-class copywriter specializing in viral marketing posts.",
                },
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="llama3-70b-8192",
            temperature=0.7,
            max_tokens=500,
        )

        return chat_completion.choices[0].message.content
    except Exception as e:
        print(f"Error generating copy: {e}")
        return "Sorry, I ran into a creative block. Please try again later!"
