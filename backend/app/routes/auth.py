# backend/app/routes/auth.py
# Replace your existing auth logic with this complete JWT implementation

from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
from pymongo import MongoClient
from passlib.context import CryptContext
import jwt
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()
security = HTTPBearer()

# ── Config ─────────────────────────────────────────────────────────────────
MONGO_URI    = os.getenv("MONGO_URI", "mongodb://localhost:27017")
JWT_SECRET   = os.getenv("JWT_SECRET", "change-this-in-production-use-a-long-random-string")
JWT_ALGO     = "HS256"
JWT_EXPIRE_H = 24  # hours

client = MongoClient(MONGO_URI)
db     = client["agri-smart"]
users  = db["users"]

pwd_ctx = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ── Schemas ─────────────────────────────────────────────────────────────────
class SignupRequest(BaseModel):
    name:     str
    email:    EmailStr
    password: str

class LoginRequest(BaseModel):
    email:    EmailStr
    password: str

# ── Helpers ─────────────────────────────────────────────────────────────────
def create_token(user_id: str, email: str) -> str:
    payload = {
        "sub":   user_id,
        "email": email,
        "exp":   datetime.utcnow() + timedelta(hours=JWT_EXPIRE_H),
        "iat":   datetime.utcnow(),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGO)

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGO])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ── Routes ───────────────────────────────────────────────────────────────────
@router.post("/api/signup")
async def signup(body: SignupRequest):
    if users.find_one({"email": body.email}):
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed = pwd_ctx.hash(body.password)
    result = users.insert_one({
        "name":       body.name,
        "email":      body.email,
        "password":   hashed,
        "created_at": datetime.utcnow(),
    })

    token = create_token(str(result.inserted_id), body.email)
    return {
        "message": "Account created",
        "token":   token,
        "user":    {"name": body.name, "email": body.email},
    }


@router.post("/api/login")
async def login(body: LoginRequest):
    user = users.find_one({"email": body.email})
    if not user or not pwd_ctx.verify(body.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token(str(user["_id"]), body.email)
    return {
        "message": "Login successful",
        "token":   token,
        "user":    {"name": user["name"], "email": user["email"]},
    }


@router.get("/api/me")
async def get_me(payload: dict = Depends(verify_token)):
    """Protected route — returns current user info from JWT."""
    user = users.find_one({"email": payload["email"]})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"name": user["name"], "email": user["email"]}