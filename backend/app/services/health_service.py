def calculate_bmi(weight, height):
    h = height / 100
    return round(weight / (h * h), 2)

def calculate_bmr(weight, height, age, gender):
    if gender == "male":
        return round(10*weight + 6.25*height - 5*age + 5, 2)
    return round(10*weight + 6.25*height - 5*age - 161, 2)

def calculate_tdee(bmr, activity):
    factors = {
        "sedentary": 1.2,
        "light": 1.375,
        "moderate": 1.55,
        "active": 1.725
    }
    return round(bmr * factors.get(activity, 1.2), 2)

def calculate_target_calories(tdee, goal):
    if goal == "lose":
        return tdee - 500
    if goal == "gain":
        return tdee + 500
    return tdee

def goal_adjusted_calories(tdee: float, goal: str):
    """
    Adjust calories based on user goal
    """
    goal = goal.lower()

    if goal == "weight_loss":
        return tdee - 500
    elif goal == "muscle_gain":
        return tdee + 300
    elif goal == "maintenance":
        return tdee
    else:
        return tdee
