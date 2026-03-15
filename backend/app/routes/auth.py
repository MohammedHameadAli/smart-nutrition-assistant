from fastapi import APIRouter, HTTPException
from app.models.user_model import UserCreate, UserLogin
from app.services.auth_service import register_user, authenticate_user

router = APIRouter(prefix="/auth", tags=["Auth"])#/docs work here... and prefix determines what auth url like login or register

@router.post("/register")
def register(user: UserCreate):#using pydantic model
    success = register_user(user.email, user.password)
    if not success:
        raise HTTPException(status_code=400, detail="User already exists")
    return {"message": "User registered successfully"}

@router.post("/login")
def login(user: UserLogin):#using pydantic model
    token = authenticate_user(user.email, user.password)#password verification and JWT creation
    if not token:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"access_token": token}#returns the access token
