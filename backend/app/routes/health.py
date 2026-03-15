from fastapi import APIRouter, Depends
from app.dependencies import get_current_user
from app.services.health_service import (
    calculate_bmi,
    calculate_bmr,
    calculate_tdee,
    goal_adjusted_calories
)

router = APIRouter(prefix="/health", tags=["Health"])

@router.get("/profile")
def health_profile(current_user: dict = Depends(get_current_user)):
    bmi = calculate_bmi(
        weight=current_user["weight"],
        height_cm=current_user["height"]
    )

    bmr = calculate_bmr(
        weight=current_user["weight"],
        height_cm=current_user["height"],
        age=current_user["age"]
    )

    tdee = calculate_tdee(
        bmr=bmr,
        activity="moderate"
    )

    target_calories = goal_adjusted_calories(
        tdee=tdee,
        goal=current_user["goal"]
    )

    return {
        "bmi": bmi,
        "bmr": bmr,
        "tdee": tdee,
        "target_calories": target_calories,
        "goal": current_user["goal"]
    }

@router.get("/recommendation")
def recommendation(current_user: dict = Depends(get_current_user)):
    goal = current_user["goal"]

    if goal == "weight_loss":
        return {
            "diet": "Low carb, high fiber",
            "exercise": "30–40 min cardio + light strength"
        }

    if goal == "muscle_gain":
        return {
            "diet": "High protein, calorie surplus",
            "exercise": "Heavy strength training (Push/Pull/Legs)"
        }

    return {
        "diet": "Balanced diet",
        "exercise": "Moderate physical activity"
    }
