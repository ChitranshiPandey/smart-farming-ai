from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class ChatRequest(BaseModel):
    message: str


@router.post("/chat")
def chat(request: ChatRequest):

    message = request.message.lower()

    # Simple AI farming assistant logic

    if "black soil" in message:

        reply = """
        Black soil is highly suitable for cotton, soybean,
        wheat, and sunflower cultivation due to its high
        moisture retention capacity.
        """

    elif "fertilizer" in message:

        reply = """
        Use nitrogen-rich fertilizers during vegetative growth.
        Organic compost and NPK fertilizers are recommended.
        """

    elif "irrigation" in message:

        reply = """
        Irrigation should be done early morning or evening
        to minimize evaporation losses.
        """

    elif "disease" in message:

        reply = """
        Regular crop monitoring and proper pesticide usage
        can help prevent common fungal diseases.
        """

    else:

        reply = """
        AI Assistant: Based on your farming conditions,
        maintaining balanced soil nutrients and proper
        irrigation scheduling will improve crop yield.
        """

    return {
        "reply": reply
    }