import os

JWT_SECRET = "supersecretkey"  
JWT_ALGORITHM = "HS256"
JWT_EXPIRE_MINUTES = 60

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = "the foods app name"

