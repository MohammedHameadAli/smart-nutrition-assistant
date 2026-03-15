from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from app.config import JWT_SECRET, JWT_ALGORITHM

security = HTTPBearer()# it tells fast api to expect a authorization header

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)#before executing routes ->FfastAPI checks authorization header ->extracts Bearer token ->passesto this function
):
    token = credentials.credentials#extracr token

    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])#decode jwt
        email: str = payload.get("sub") #sub = user email

        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token"
            )

        #RETURNA DICT (NOT STRING)
        return {
            "email": email
        }

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token is invalid or expired"
        )
