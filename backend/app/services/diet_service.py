def generate_diet_plan(
    tdee: float,
    goal: str,
    detected_food: str,
    detected_calories: float
):
    if tdee <= 0:
        return {"error": "Invalid TDEE"}

    # calorie adjustment
    if goal == "weight_loss":
        target_calories = tdee - 500
        diet_plan = [
            "High-protein foods (chicken breast, eggs, fish)",
            "Low-GI carbs (oats, brown rice, quinoa)",
            "Large portions of vegetables",
            "Avoid sugar & fried foods",
            "Drink at least 2.5L water daily"
        ]

    elif goal == "muscle_gain":
        target_calories = tdee + 300
        diet_plan = [
            "High-protein meals (eggs, chicken, paneer)",
            "Calorie-dense carbs (rice, potatoes, oats)",
            "Healthy fats (nuts, peanut butter)",
            "Protein shake post-workout",
            "Eat every 3–4 hours"
        ]

    else:  # maintenance
        target_calories = tdee
        diet_plan = [
            "Balanced protein, carbs & fats",
            "Seasonal fruits & vegetables",
            "Moderate portion sizes",
            "Limit junk food",
            "Maintain hydration"
        ]

    remaining_calories = max(target_calories - detected_calories, 0)

    return {
        "goal": goal,
        "target_calories": round(target_calories, 2),
        "detected_food": detected_food,
        "consumed_calories": detected_calories,
        "remaining_calories": round(remaining_calories, 2),
        "diet_plan": diet_plan
    }
