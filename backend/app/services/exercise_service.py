# backend/app/services/exercise_service.py

def generate_exercise_plan(
    bmi: float,
    goal: str,
    activity_level: str
):
    if bmi <= 0:
        return {"error": "Invalid BMI"}

    workouts = []

    if goal == "weight_loss":
        workouts = [
            "30–45 min cardio (walking, cycling)",
            "HIIT – 3 days/week",
            "Light strength training"
        ]
    elif goal == "muscle_gain":
        workouts = [
            "Strength training – 5 days/week",
            "Compound lifts (squat, deadlift, bench)",
            "Progressive overload"
        ]
    else:
        workouts = [
            "Moderate cardio – 3 days/week",
            "Full-body workouts",
            "Flexibility & mobility exercises"
        ]

    return {
        "bmi": bmi,
        "goal": goal,
        "activity_level": activity_level,
        "exercise_plan": workouts
    }
