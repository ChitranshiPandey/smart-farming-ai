from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
def chat(request: ChatRequest):

    message = request.message.lower()

    if "black soil" in message:
        reply = """
Black soil is suitable for:
• Cotton
• Soybean
• Wheat
• Sunflower
"""

    elif "fertilizer" in message:
        reply = """
Recommended:
• NPK Fertilizer
• Organic Compost
• Vermicompost
"""

    elif "weather" in message:
        reply = """
Weather affects:
• Crop growth
• Disease spread
• Water requirement
"""

    elif "disease" in message:
        reply = """
Monitor crops regularly.
Use pesticides only when necessary.
"""

    else:
        reply = """
🌾 AgriSmart AI:

Maintain soil nutrients,
follow proper irrigation,
and monitor weather regularly.
"""

    return {"reply": reply}































# from fastapi import APIRouter
# from pydantic import BaseModel

# router = APIRouter()

# class ChatRequest(BaseModel):
#     message: str

# @router.post("/chat")
# def chat(request: ChatRequest):

#     message = request.message.lower()

#     if "black soil" in message:
#         reply = """
# Black soil is highly suitable for:
# • Cotton
# • Soybean
# • Wheat
# • Sunflower

# It retains moisture well and is rich in nutrients.
# """

#     elif "fertilizer" in message:
#         reply = """
# Recommended fertilizers:

# • NPK Fertilizer
# • Organic Compost
# • Vermicompost

# Apply according to soil testing reports.
# """

#     elif "irrigation" in message:
#         reply = """
# Best irrigation practices:

# • Early morning irrigation
# • Evening irrigation
# • Drip irrigation saves water
# """

#     elif "weather" in message:
#         reply = """
# Weather impacts:

# • High rainfall → disease risk
# • Low rainfall → irrigation required
# • Temperature affects yield
# """

#     elif "disease" in message:
#         reply = """
# Disease prevention:

# • Regular monitoring
# • Use certified seeds
# • Apply fungicides when needed
# """

#     else:
#         reply = """
# 🌾 AgriSmart AI Advice:

# Maintain balanced soil nutrients,
# proper irrigation scheduling,
# and monitor weather conditions
# for higher crop yield.
# """

#     return {
#         "reply": reply
#     }
















# from fastapi import APIRouter
# from pydantic import BaseModel

# router = APIRouter()


# class ChatRequest(BaseModel):
#     message: str


# @router.post("/chat")
# def chat(request: ChatRequest):

#     message = request.message.lower()

#     # Simple AI farming assistant logic

#     if "black soil" in message:

#         reply = """
#         Black soil is highly suitable for cotton, soybean,
#         wheat, and sunflower cultivation due to its high
#         moisture retention capacity.
#         """

#     elif "fertilizer" in message:

#         reply = """
#         Use nitrogen-rich fertilizers during vegetative growth.
#         Organic compost and NPK fertilizers are recommended.
#         """

#     elif "irrigation" in message:

#         reply = """
#         Irrigation should be done early morning or evening
#         to minimize evaporation losses.
#         """

#     elif "disease" in message:

#         reply = """
#         Regular crop monitoring and proper pesticide usage
#         can help prevent common fungal diseases.
#         """

#     else:

#         reply = """
#         AI Assistant: Based on your farming conditions,
#         maintaining balanced soil nutrients and proper
#         irrigation scheduling will improve crop yield.
#         """

#     return {
#         "reply": reply
#     }