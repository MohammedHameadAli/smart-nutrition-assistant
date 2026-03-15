from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.auth import router as auth_router
from app.routes.food import router as food_router
from app.routes.health import router as health_router
from app.routes.diet import router as diet_router
from app.routes.exercise import router as exercise_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,  #cross oringin resource sharing -- it helps connect backend port with frontenf port
    allow_origins=[
        "http://localhost:5173",  # Vite frontend
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth_router)
app.include_router(food_router)
app.include_router(health_router)
app.include_router(diet_router)
app.include_router(exercise_router)

@app.get("/")
def root():
    return {"status": "API running"}


