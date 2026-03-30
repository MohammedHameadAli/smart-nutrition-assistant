# def generate_diet_plan(
#     tdee: float,
#     goal: str,
#     detected_food: str,
#     detected_calories: float
# ):
#     if tdee <= 0:
#         return {"error": "Invalid TDEE"}

#     # calorie adjustment
#     if goal == "weight_loss":
#         target_calories = tdee - 500
#         diet_plan = [
#             "High-protein foods (chicken breast, eggs, fish)",
#             "Low-GI carbs (oats, brown rice, quinoa)",
#             "Large portions of vegetables",
#             "Avoid sugar & fried foods",
#             "Drink at least 2.5L water daily"
#         ]

#     elif goal == "muscle_gain":
#         target_calories = tdee + 300
#         diet_plan = [
#             "High-protein meals (eggs, chicken, paneer)",
#             "Calorie-dense carbs (rice, potatoes, oats)",
#             "Healthy fats (nuts, peanut butter)",
#             "Protein shake post-workout",
#             "Eat every 3–4 hours"
#         ]

#     else:  # maintenance
#         target_calories = tdee
#         diet_plan = [
#             "Balanced protein, carbs & fats",
#             "Seasonal fruits & vegetables",
#             "Moderate portion sizes",
#             "Limit junk food",
#             "Maintain hydration"
#         ]

#     remaining_calories = max(target_calories - detected_calories, 0)

#     return {
#         "goal": goal,
#         "target_calories": round(target_calories, 2),
#         "detected_food": detected_food,
#         "consumed_calories": detected_calories,
#         "remaining_calories": round(remaining_calories, 2),
#         "diet_plan": diet_plan
#     }

# def categorize_food(food: str):
#     food = food.lower()

#     high_calorie = ["pizza", "burger", "fries", "fried rice", "biryani", "cake", "ice cream"]
#     carbs = ["rice", "pasta", "bread", "naan", "roti", "potato"]
#     protein = ["chicken", "eggs", "paneer", "fish", "dal", "tofu"]
#     healthy = ["apple", "banana", "orange", "salad", "vegetables", "broccoli"]

#     if food in high_calorie:
#         return "high_calorie"
#     elif food in carbs:
#         return "carbs"
#     elif food in protein:
#         return "protein"
#     elif food in healthy:
#         return "healthy"
#     else:
#         return "general"


# def generate_diet_plan(
#     tdee: float,
#     goal: str,
#     detected_food: str,
#     detected_calories: float
# ):
#     if tdee <= 0:
#         return {"error": "Invalid TDEE"}

#     goal = goal.lower()
#     food_category = categorize_food(detected_food)

#     # Step 1: Set target calories
#     if goal == "weight_loss":
#         target_calories = tdee - 500
#     elif goal == "muscle_gain":
#         target_calories = tdee + 300
#     else:
#         target_calories = tdee

#     remaining_calories = max(target_calories - detected_calories, 0)

#     # Step 2: Food-based analysis
#     if food_category == "high_calorie":
#         diet_quality = "Poor"
#         analysis = f"{detected_food} is relatively high in calories and fats. Frequent intake may affect your nutrition goals."
#         healthy_alternative = "Try grilled protein, salad bowls, fruit-based snacks, or homemade low-oil meals."
#     elif food_category == "carbs":
#         diet_quality = "Moderate"
#         analysis = f"{detected_food} is mainly carbohydrate-rich and provides energy, but should be balanced with protein and vegetables."
#         healthy_alternative = "Pair it with dal, paneer, eggs, chicken, or vegetables for a balanced meal."
#     elif food_category == "protein":
#         diet_quality = "Good"
#         analysis = f"{detected_food} is a good protein source and supports muscle repair and satiety."
#         healthy_alternative = "Keep portions balanced and combine with fiber-rich vegetables or complex carbs."
#     elif food_category == "healthy":
#         diet_quality = "Excellent"
#         analysis = f"{detected_food} is a nutritious choice and supports overall health and digestion."
#         healthy_alternative = "Continue including such foods regularly as part of a balanced diet."
#     else:
#         diet_quality = "Average"
#         analysis = f"{detected_food} provides calories and energy, but its nutritional quality depends on portion size and meal balance."
#         healthy_alternative = "Try balancing it with lean protein, vegetables, and hydration."

#     # Step 3: Goal-based advice
#     if goal == "weight_loss":
#         if food_category == "high_calorie":
#             goal_advice = "For weight loss, reduce portion size, avoid sugary drinks, and keep your next meals lighter."
#             next_meal = "Choose a high-protein, low-fat meal such as grilled chicken, dal, or paneer with vegetables."
#         elif food_category == "carbs":
#             goal_advice = "Control portion size and include protein to avoid excess calorie intake."
#             next_meal = "Eat a protein-rich and fiber-rich meal next, such as eggs with salad or dal with vegetables."
#         elif food_category == "protein":
#             goal_advice = "This is generally a good choice for weight loss when prepared with minimal oil."
#             next_meal = "Keep your next meal light and balanced with vegetables and hydration."
#         else:
#             goal_advice = "Focus on maintaining a calorie deficit while ensuring enough protein and fiber."
#             next_meal = "Choose a balanced meal with lean protein and vegetables."

#     elif goal == "muscle_gain":
#         if food_category == "high_calorie":
#             goal_advice = "This can support muscle gain if total calories are controlled and protein intake is adequate."
#             next_meal = "Add a protein-rich next meal such as eggs, chicken, paneer, or a protein shake."
#         elif food_category == "carbs":
#             goal_advice = "This provides energy, but muscle gain also requires adequate protein intake."
#             next_meal = "Pair your next meal with a strong protein source like chicken, fish, tofu, or paneer."
#         elif food_category == "protein":
#             goal_advice = "This is highly supportive of muscle gain and recovery."
#             next_meal = "Follow it with a balanced carb source such as rice, oats, or potatoes."
#         else:
#             goal_advice = "Ensure sufficient calories and protein throughout the day to support muscle growth."
#             next_meal = "Your next meal should include both carbs and protein."

#     else:  # maintenance
#         goal_advice = "Maintain balanced meals and avoid excessive processed or high-fat foods."
#         next_meal = "Aim for a balanced next meal with protein, carbs, vegetables, and hydration."

#     # Step 4: Suggested daily plan
#     if goal == "weight_loss":
#         daily_plan = [
#             "High-protein foods (chicken breast, eggs, fish, paneer, tofu)",
#             "Low-GI carbs (oats, brown rice, quinoa)",
#             "Large portions of vegetables",
#             "Limit sugar and fried foods",
#             "Drink at least 2.5L water daily"
#         ]
#     elif goal == "muscle_gain":
#         daily_plan = [
#             "High-protein meals (eggs, chicken, paneer, tofu, fish)",
#             "Energy-rich carbs (rice, oats, potatoes, whole wheat bread)",
#             "Healthy fats (nuts, peanut butter, seeds)",
#             "Post-workout protein intake",
#             "Eat every 3–4 hours"
#         ]
#     else:
#         daily_plan = [
#             "Balanced protein, carbs, and healthy fats",
#             "Seasonal fruits and vegetables",
#             "Moderate portion sizes",
#             "Limit junk and processed food",
#             "Maintain hydration"
#         ]

#     return {
#         "goal": goal,
#         "target_calories": round(target_calories, 2),
#         "detected_food": detected_food,
#         "food_category": food_category,
#         "diet_quality": diet_quality,
#         "consumed_calories": detected_calories,
#         "remaining_calories": round(remaining_calories, 2),
#         "analysis": analysis,
#         "goal_advice": goal_advice,
#         "healthy_alternative": healthy_alternative,
#         "next_meal_suggestion": next_meal,
#         "daily_diet_plan": daily_plan
#     }






from datetime import datetime

def categorize_food(food: str):
    food = food.lower()

    high_calorie = ["pizza", "burger", "cheeseburger", "fries", "fried rice", "biryani", "cake", "ice cream"]
    carbs = ["rice", "pasta", "bread", "naan", "roti", "potato"]
    protein = ["chicken", "eggs", "paneer", "fish", "dal", "tofu"]
    healthy = ["apple", "banana", "orange", "salad", "vegetables", "broccoli", "cucumber", "pomegranate"]

    if food in high_calorie:
        return "high_calorie"
    elif food in carbs:
        return "carbs"
    elif food in protein:
        return "protein"
    elif food in healthy:
        return "healthy"
    else:
        return "general"


def generate_diet_plan(
    tdee: float,
    goal: str,
    detected_food: str,
    detected_calories: float,
    food_history: list
):
    if tdee <= 0:
        return {"error": "Invalid TDEE"}

    goal = goal.lower()
    food_category = categorize_food(detected_food)

    # 1. Set target calories
    if goal == "weight_loss":
        target_calories = tdee - 500
    elif goal == "muscle_gain":
        target_calories = tdee + 300
    else:
        target_calories = tdee

    # 2. Get today's food logs only
    today = datetime.now().date()
    todays_foods = []

    for item in food_history:
        try:
            timestamp = item.get("timestamp")

        # Case 1: already a datetime object
            if isinstance(timestamp, datetime):
                log_date = timestamp.date()

        # Case 2: string timestamp
            elif isinstance(timestamp, str):
                log_date = datetime.fromisoformat(timestamp.replace("Z", "")).date()

            else:
                continue

            if log_date == today:
                todays_foods.append(item)

        except Exception as e:
            print("Timestamp parsing error:", e)
        continue
    print("FOOD HISTORY:", food_history)
    print("TODAY'S FOODS:", todays_foods)

    # 3. Calculate today's totals
    total_calories_today = sum(item["nutrition"]["calories"] for item in todays_foods)
    total_protein_today = sum(item["nutrition"]["protein"] for item in todays_foods)
    total_carbs_today = sum(item["nutrition"]["carbs"] for item in todays_foods)
    total_fats_today = sum(item["nutrition"]["fats"] for item in todays_foods)

    # 4. Count high-calorie foods today
    high_calorie_count = 0
    for item in todays_foods:
        if categorize_food(item["food"]) == "high_calorie":
            high_calorie_count += 1

    # 5. Food-based quality
    if food_category == "high_calorie":
        food_analysis = f"{detected_food} is relatively high in calories and fats."
    elif food_category == "carbs":
        food_analysis = f"{detected_food} is mainly carbohydrate-rich and should be balanced with protein."
    elif food_category == "protein":
        food_analysis = f"{detected_food} is a good protein source and supports muscle repair and satiety."
    elif food_category == "healthy":
        food_analysis = f"{detected_food} is a nutritious food that supports digestion and overall health."
    else:
        food_analysis = f"{detected_food} should be consumed in balanced portions."

    # 6. History-aware smart advice
    if high_calorie_count >= 2:
        diet_quality = "Poor"
        smart_advice = "You have already consumed multiple high-calorie foods today. Your next meals should be lighter and more balanced."
        next_meal = "Choose grilled chicken, paneer, dal, vegetables, or salad for your next meal."
    elif total_protein_today < 30 and goal == "muscle_gain":
        diet_quality = "Moderate"
        smart_advice = "Your protein intake today appears low for muscle gain. Increase protein-rich foods in your next meals."
        next_meal = "Eat eggs, chicken, paneer, tofu, or a protein shake in your next meal."
    elif total_calories_today > target_calories:
        diet_quality = "Moderate"
        smart_advice = "You are close to or above your calorie target for today. Keep your remaining meals lighter."
        next_meal = "Choose a low-calorie meal with vegetables and lean protein."
    else:
        diet_quality = "Good"
        smart_advice = "Your current daily intake appears relatively balanced. Continue maintaining portion control and meal balance."
        next_meal = "Maintain a balanced next meal with protein, vegetables, and moderate carbs."

    # 7. Remaining calories
    remaining_calories = max(target_calories - total_calories_today, 0)

    # 8. Goal-specific daily plan
    if goal == "weight_loss":
        daily_plan = [
            "Eat high-protein foods (eggs, chicken, paneer, tofu)",
            "Choose low-GI carbs (brown rice, oats, whole wheat roti)",
            "Increase vegetables and fiber intake",
            "Avoid sugary drinks and fried snacks",
            "Drink at least 2.5L water daily"
        ]
    elif goal == "muscle_gain":
        daily_plan = [
            "Consume high-protein meals regularly",
            "Include calorie-dense but healthy carbs like rice, oats, and potatoes",
            "Eat healthy fats such as nuts and peanut butter",
            "Eat every 3–4 hours",
            "Use a post-workout protein source if needed"
        ]
    else:
        daily_plan = [
            "Maintain balanced meals with protein, carbs, and fats",
            "Eat fruits and vegetables daily",
            "Limit processed and junk food",
            "Keep hydration consistent",
            "Follow moderate portion sizes"
        ]

    return {
        "goal": goal,
        "detected_food": detected_food,
        "food_category": food_category,
        "food_analysis": food_analysis,
        "diet_quality": diet_quality,
        "target_calories": round(target_calories, 2),
        "consumed_calories_current_food": detected_calories,
        "total_calories_today": round(total_calories_today, 2),
        "total_protein_today": round(total_protein_today, 2),
        "total_carbs_today": round(total_carbs_today, 2),
        "total_fats_today": round(total_fats_today, 2),
        "remaining_calories": round(remaining_calories, 2),
        "smart_advice": smart_advice,
        "next_meal_suggestion": next_meal,
        "daily_diet_plan": daily_plan
    }