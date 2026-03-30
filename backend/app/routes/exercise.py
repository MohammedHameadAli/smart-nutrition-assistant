# # backend/app/routes/exercise.py

# from fastapi import APIRouter
# from pydantic import BaseModel
# from app.services.exercise_service import generate_exercise_plan

# router = APIRouter(prefix="/exercise", tags=["Exercise"])

# class ExerciseRequest(BaseModel):
#     bmi: float
#     goal: str
#     activity_level: str

# @router.post("/plan")
# def get_exercise_plan(data: ExerciseRequest):
#     return generate_exercise_plan(
#         bmi=data.bmi,
#         goal=data.goal,
#         activity_level=data.activity_level
#     )

from fastapi import APIRouter
from pydantic import BaseModel
from app.services.exercise_service import generate_exercise_plan

router = APIRouter(prefix="/exercise", tags=["Exercise"])

class ExerciseRequest(BaseModel):
    bmi: float
    goal: str
    activity_level: str

@router.post("/plan")
def get_exercise_plan(data: ExerciseRequest):
    return generate_exercise_plan(
        bmi=data.bmi,
        goal=data.goal,
        activity_level=data.activity_level
    )