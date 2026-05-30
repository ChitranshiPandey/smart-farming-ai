import os
import google.generativeai as genai
from PIL import Image
from dotenv import load_dotenv
import traceback

load_dotenv()

# ✅ Accept BOTH possible env names
API_KEY = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")

genai.configure(api_key=API_KEY)

model = genai.GenerativeModel("gemini-1.5-flash")


def analyze_leaf(image_path):
    try:
        image = Image.open(image_path)

        prompt = """
        You are an expert agricultural AI.

        Analyze this plant leaf image and return:
        1. Disease name (or Healthy Leaf)
        2. Confidence percentage
        3. Symptoms
        4. Treatment

        Keep response short and structured.
        """

        response = model.generate_content([prompt, image])

        return response.text

    except Exception as e:
        print("❌ ERROR IN GEMINI:", str(e))
        traceback.print_exc()

        return f"Error analyzing image: {str(e)}"