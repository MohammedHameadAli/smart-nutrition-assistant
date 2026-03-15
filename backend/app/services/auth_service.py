# User exist or not checkiing

# password hashing

# Password verification

# JWTtoken creation

from app.database import user_collection
from app.utils.security import hash_password, verify_password, create_access_token

def register_user(email: str, password: str):
    if user_collection.find_one({"email": email}):#check if user exists or not
        return None

    hashed = hash_password(password)
    user_collection.insert_one({#store user
        "email": email,
        "password": hashed
    })
    return True

def authenticate_user(email: str, password: str):
    user = user_collection.find_one({"email": email})
    if not user:
        return None

    if not verify_password(password, user["password"]):
        return None

    token = create_access_token({"sub": email})
    return token
