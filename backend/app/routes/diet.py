# backend/app/routes/diet.py

from fastapi import APIRouter
from pydantic import BaseModel
from app.services.diet_service import generate_diet_plan

router = APIRouter(prefix="/diet", tags=["Diet"])

class DietRequest(BaseModel):
    tdee: float
    goal: str
    detected_food: str
    detected_calories: float

@router.post("/plan")
def get_diet_plan(data: DietRequest):
    return generate_diet_plan(
        tdee=data.tdee,
        goal=data.goal,
        detected_food=data.detected_food,
        detected_calories=data.detected_calories
    )
