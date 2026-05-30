from fastapi import APIRouter, UploadFile, File
import shutil
import os

from app.services.disease_ai import analyze_leaf

router = APIRouter()

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/disease-detect")
async def detect_disease(
    file: UploadFile = File(...)
):

    filepath = f"{UPLOAD_DIR}/{file.filename}"

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    result = analyze_leaf(filepath)

    return {
        "analysis": result
    }