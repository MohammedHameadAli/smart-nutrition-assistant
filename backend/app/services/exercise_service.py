# # backend/app/services/exercise_service.py

# def generate_exercise_plan(
#     bmi: float,
#     goal: str,
#     activity_level: str
# ):
#     if bmi <= 0:
#         return {"error": "Invalid BMI"}

#     workouts = []

#     if goal == "weight_loss":
#         workouts = [
#             "30–45 min cardio (walking, cycling)",
#             "HIIT – 3 days/week",
#             "Light strength training"
#         ]
#     elif goal == "muscle_gain":
#         workouts = [
#             "Strength training – 5 days/week",
#             "Compound lifts (squat, deadlift, bench)",
#             "Progressive overload"
#         ]
#     else:
#         workouts = [
#             "Moderate cardio – 3 days/week",
#             "Full-body workouts",
#             "Flexibility & mobility exercises"
#         ]

#     return {
#         "bmi": bmi,
#         "goal": goal,
#         "activity_level": activity_level,
#         "exercise_plan": workouts
#     }






def generate_exercise_plan(
    bmi: float,
    goal: str,
    activity_level: str
):
    # Validate input
    if bmi <= 0:
        return {"error": "Invalid BMI"}

    goal = goal.lower().strip()
    activity_level = activity_level.lower().strip()

    # -----------------------------
    # BMI Classification
    # -----------------------------
    if bmi < 18.5:
        bmi_category = "underweight"
    elif bmi < 25:
        bmi_category = "normal"
    elif bmi < 30:
        bmi_category = "overweight"
    else:
        bmi_category = "obese"

    # -----------------------------
    # Activity Level Classification
    # -----------------------------
    if activity_level == "sedentary":
        fitness_level = "beginner"
        intensity = "low to moderate"
        session_duration = "25–35 minutes"
    elif activity_level == "moderate":
        fitness_level = "intermediate"
        intensity = "moderate"
        session_duration = "35–50 minutes"
    elif activity_level == "active":
        fitness_level = "advanced"
        intensity = "moderate to high"
        session_duration = "45–60 minutes"
    else:
        fitness_level = "beginner"
        intensity = "moderate"
        session_duration = "30–40 minutes"

    # -----------------------------
    # Common Plan Components
    # -----------------------------
    warmup = [
        "5 min brisk walking or marching in place",
        "Arm circles",
        "Leg swings",
        "Dynamic stretching"
    ]

    cooldown = [
        "Slow walking for 3–5 min",
        "Hamstring stretch",
        "Quadriceps stretch",
        "Shoulder stretch"
    ]

    precautions = [
        "Stay hydrated",
        "Maintain proper form during all exercises",
        "Stop exercise if pain, dizziness, or discomfort occurs"
    ]

    recommended_exercises = []
    weekly_schedule = {}
    frequency_per_week = ""
    estimated_calorie_burn_per_session = ""
    recommendation_reason = ""

    # -----------------------------
    # Goal-Based Logic
    # -----------------------------
    if goal == "weight_loss":
        frequency_per_week = "5 days/week"
        estimated_calorie_burn_per_session = "200–400 kcal"

        recommended_exercises = [
            "Brisk walking",
            "Cycling",
            "Jumping jacks",
            "Bodyweight squats",
            "Lunges",
            "Plank",
            "Mountain climbers"
        ]

        weekly_schedule = {
            "Monday": "Cardio + Core",
            "Tuesday": "Lower Body Strength",
            "Wednesday": "Brisk Walk + Stretching",
            "Thursday": "Upper Body Bodyweight Workout",
            "Friday": "Cardio + Abs",
            "Saturday": "Full Body Workout",
            "Sunday": "Rest / Light Yoga"
        }

        recommendation_reason = (
            f"This plan is designed for a {bmi_category} user whose goal is weight loss "
            f"with a {fitness_level} fitness profile."
        )

        if bmi_category in ["overweight", "obese"]:
            precautions.append("Prefer low-impact cardio to reduce joint stress")

    elif goal == "muscle_gain":
        frequency_per_week = "4–5 days/week"
        estimated_calorie_burn_per_session = "150–300 kcal"

        recommended_exercises = [
            "Push-ups",
            "Squats",
            "Lunges",
            "Bench press",
            "Deadlifts",
            "Shoulder press",
            "Rows",
            "Pull-ups",
            "Plank"
        ]

        weekly_schedule = {
            "Monday": "Chest + Triceps",
            "Tuesday": "Back + Biceps",
            "Wednesday": "Leg Day",
            "Thursday": "Active Recovery / Mobility",
            "Friday": "Shoulders + Abs",
            "Saturday": "Full Body Strength",
            "Sunday": "Rest"
        }

        recommendation_reason = (
            f"This plan is designed for a {bmi_category} user whose goal is muscle gain "
            f"with a {fitness_level} fitness profile."
        )

        if bmi_category == "underweight":
            precautions.append("Ensure sufficient calorie and protein intake for muscle growth")

    elif goal == "maintenance":
        frequency_per_week = "3–4 days/week"
        estimated_calorie_burn_per_session = "180–300 kcal"

        recommended_exercises = [
            "Walking",
            "Jogging",
            "Push-ups",
            "Squats",
            "Plank",
            "Stretching",
            "Bodyweight lunges"
        ]

        weekly_schedule = {
            "Monday": "Full Body Workout",
            "Tuesday": "Walking / Cardio",
            "Wednesday": "Rest",
            "Thursday": "Strength + Core",
            "Friday": "Mobility + Stretching",
            "Saturday": "Light Cardio",
            "Sunday": "Rest"
        }

        recommendation_reason = (
            f"This plan is designed to maintain overall fitness for a {bmi_category} user "
            f"with a {fitness_level} activity profile."
        )

    else:
        frequency_per_week = "3 days/week"
        estimated_calorie_burn_per_session = "150–250 kcal"

        recommended_exercises = [
            "Walking",
            "Stretching",
            "Bodyweight squats",
            "Push-ups",
            "Plank"
        ]

        weekly_schedule = {
            "Monday": "Walking + Mobility",
            "Wednesday": "Bodyweight Workout",
            "Friday": "Stretching + Light Cardio"
        }

        recommendation_reason = (
            "A general beginner-friendly fitness plan was generated because the provided goal "
            "did not match predefined categories."
        )

    # -----------------------------
    # Return Final Structured Output
    # -----------------------------
    return {
        "bmi": bmi,
        "bmi_category": bmi_category,
        "goal": goal,
        "activity_level": activity_level,
        "fitness_level": fitness_level,
        "intensity": intensity,
        "session_duration": session_duration,
        "frequency_per_week": frequency_per_week,
        "estimated_calorie_burn_per_session": estimated_calorie_burn_per_session,
        "recommended_exercises": recommended_exercises,
        "warmup": warmup,
        "cooldown": cooldown,
        "weekly_schedule": weekly_schedule,
        "precautions": precautions,
        "recommendation_reason": recommendation_reason
    }