# # backend/app/services/nutrition_service.py

# # Nutrition per 100g (approximate averages)
# NUTRITION_PER_100G = {
#     "pizza": {"calories": 266, "protein": 11, "carbs": 33, "fats": 10},
#     "burger": {"calories": 295, "protein": 17, "carbs": 30, "fats": 14},
#     "pasta": {"calories": 131, "protein": 5, "carbs": 25, "fats": 1},
#     "fried chicken": {"calories": 296, "protein": 21, "carbs": 8, "fats": 20},
#     "grilled chicken": {"calories": 165, "protein": 31, "carbs": 0, "fats": 4},
#     "steak": {"calories": 271, "protein": 25, "carbs": 0, "fats": 19},
#     "sandwich": {"calories": 250, "protein": 10, "carbs": 30, "fats": 8},
#     "hot dog": {"calories": 290, "protein": 10, "carbs": 24, "fats": 18},
#     "sushi": {"calories": 130, "protein": 6, "carbs": 28, "fats": 1},
#     "rice": {"calories": 130, "protein": 2.7, "carbs": 28, "fats": 0.3},
#     "noodles": {"calories": 138, "protein": 4.5, "carbs": 25, "fats": 2},
#     "salad": {"calories": 33, "protein": 2, "carbs": 6, "fats": 0.4},
#     "french fries": {"calories": 312, "protein": 3.4, "carbs": 41, "fats": 15},
#     "omelette": {"calories": 154, "protein": 11, "carbs": 1, "fats": 12},
#     "pancakes": {"calories": 227, "protein": 6, "carbs": 28, "fats": 10},
#     "waffles": {"calories": 291, "protein": 7, "carbs": 32, "fats": 14},
#     "cake": {"calories": 257, "protein": 4, "carbs": 38, "fats": 10},
#     "ice cream": {"calories": 207, "protein": 3.5, "carbs": 24, "fats": 11},
#     "donut": {"calories": 452, "protein": 4.9, "carbs": 51, "fats": 25},
#     "apple": {"calories": 52, "protein": 0.3, "carbs": 14, "fats": 0.2},
#     "banana": {"calories": 89, "protein": 1.1, "carbs": 23, "fats": 0.3},
#     "orange": {"calories": 47, "protein": 0.9, "carbs": 12, "fats": 0.1},
#     "bread": {"calories": 265, "protein": 9, "carbs": 49, "fats": 3.2},
#     "cheese": {"calories": 402, "protein": 25, "carbs": 1.3, "fats": 33},
#     "yogurt": {"calories": 59, "protein": 10, "carbs": 3.6, "fats": 0.4},
#     "milk": {"calories": 42, "protein": 3.4, "carbs": 5, "fats": 1},
#     "soup": {"calories": 75, "protein": 4, "carbs": 10, "fats": 2}
# }

# def calculate_nutrition(food_name: str, grams: int):
#     food_name = food_name.lower()
#     base = NUTRITION_PER_100G.get(food_name)

#     if not base:
#         return {"calories": 0, "protein": 0, "carbs": 0, "fats": 0}

#     factor = grams / 100.0

#     return {
#         "calories": round(base["calories"] * factor, 2),
#         "protein": round(base["protein"] * factor, 2),
#         "carbs": round(base["carbs"] * factor, 2),
#         "fats": round(base["fats"] * factor, 2)
#     }
# backend/app/services/nutrition_service.py

# RESNET 

# # Nutrition per 100g (approximate averages)
# NUTRITION_PER_100G = {
#     "pizza": {"calories": 266, "protein": 11, "carbs": 33, "fats": 10},
#     "burger": {"calories": 295, "protein": 17, "carbs": 30, "fats": 14},
#     "pasta": {"calories": 131, "protein": 5, "carbs": 25, "fats": 1},
#     "fried chicken": {"calories": 296, "protein": 21, "carbs": 8, "fats": 20},
#     "grilled chicken": {"calories": 165, "protein": 31, "carbs": 0, "fats": 4},
#     "steak": {"calories": 271, "protein": 25, "carbs": 0, "fats": 19},
#     "sandwich": {"calories": 250, "protein": 10, "carbs": 30, "fats": 8},
#     "hot dog": {"calories": 290, "protein": 10, "carbs": 24, "fats": 18},
#     "sushi": {"calories": 130, "protein": 6, "carbs": 28, "fats": 1},
#     "rice": {"calories": 130, "protein": 2.7, "carbs": 28, "fats": 0.3},
#     "noodles": {"calories": 138, "protein": 4.5, "carbs": 25, "fats": 2},
#     "salad": {"calories": 33, "protein": 2, "carbs": 6, "fats": 0.4},
#     "french fries": {"calories": 312, "protein": 3.4, "carbs": 41, "fats": 15},
#     "omelette": {"calories": 154, "protein": 11, "carbs": 1, "fats": 12},
#     "pancakes": {"calories": 227, "protein": 6, "carbs": 28, "fats": 10},
#     "waffles": {"calories": 291, "protein": 7, "carbs": 32, "fats": 14},
#     "cake": {"calories": 257, "protein": 4, "carbs": 38, "fats": 10},
#     "ice cream": {"calories": 207, "protein": 3.5, "carbs": 24, "fats": 11},
#     "donut": {"calories": 452, "protein": 4.9, "carbs": 51, "fats": 25},
#     "apple": {"calories": 52, "protein": 0.3, "carbs": 14, "fats": 0.2},
#     "banana": {"calories": 89, "protein": 1.1, "carbs": 23, "fats": 0.3},
#     "orange": {"calories": 47, "protein": 0.9, "carbs": 12, "fats": 0.1},
#     "bread": {"calories": 265, "protein": 9, "carbs": 49, "fats": 3.2},
#     "cheese": {"calories": 402, "protein": 25, "carbs": 1.3, "fats": 33},
#     "yogurt": {"calories": 59, "protein": 10, "carbs": 3.6, "fats": 0.4},
#     "milk": {"calories": 42, "protein": 3.4, "carbs": 5, "fats": 1},
#     "soup": {"calories": 75, "protein": 4, "carbs": 10, "fats": 2},
#     "axolotl": {"calories": 67, "protein": 6, "carbs": 10, "fats": 2}
# }

# def calculate_nutrition(food_name: str, grams: int):
#     food_name = food_name.lower()
#     base = NUTRITION_PER_100G.get(food_name)

#     if not base:
#         return {
#             "calories": 0,
#             "protein": 0,
#             "carbs": 0,
#             "fats": 0
#         }

#     factor = grams / 100.0

#     return {
#         "calories": round(base["calories"] * factor, 2),
#         "protein": round(base["protein"] * factor, 2),
#         "carbs": round(base["carbs"] * factor, 2),
#         "fats": round(base["fats"] * factor, 2)
#     }




# Nutrition per 100g (approximate averages)
#WORKIING NUTRIENTS ONE


# NUTRITION_PER_100G = {
#     "pizza": {"calories": 266, "protein": 11, "carbs": 33, "fats": 10},
#     "burger": {"calories": 295, "protein": 17, "carbs": 30, "fats": 14},
#     "pasta": {"calories": 131, "protein": 5, "carbs": 25, "fats": 1},
#     "fried chicken": {"calories": 296, "protein": 21, "carbs": 8, "fats": 20},
#     "grilled chicken": {"calories": 165, "protein": 31, "carbs": 0, "fats": 4},
#     "steak": {"calories": 271, "protein": 25, "carbs": 0, "fats": 19},
#     "sandwich": {"calories": 250, "protein": 10, "carbs": 30, "fats": 8},
#     "hot dog": {"calories": 290, "protein": 10, "carbs": 24, "fats": 18},
#     "sushi": {"calories": 130, "protein": 6, "carbs": 28, "fats": 1},
#     "rice": {"calories": 130, "protein": 2.7, "carbs": 28, "fats": 0.3},
#     "noodles": {"calories": 138, "protein": 4.5, "carbs": 25, "fats": 2},
#     "salad": {"calories": 33, "protein": 2, "carbs": 6, "fats": 0.4},
#     "french fries": {"calories": 312, "protein": 3.4, "carbs": 41, "fats": 15},
#     "omelette": {"calories": 154, "protein": 11, "carbs": 1, "fats": 12},
#     "pancakes": {"calories": 227, "protein": 6, "carbs": 28, "fats": 10},
#     "waffles": {"calories": 291, "protein": 7, "carbs": 32, "fats": 14},
#     "cake": {"calories": 257, "protein": 4, "carbs": 38, "fats": 10},
#     "ice cream": {"calories": 207, "protein": 3.5, "carbs": 24, "fats": 11},
#     "donut": {"calories": 452, "protein": 4.9, "carbs": 51, "fats": 25},
#     "apple": {"calories": 52, "protein": 0.3, "carbs": 14, "fats": 0.2},
#     "banana": {"calories": 89, "protein": 1.1, "carbs": 23, "fats": 0.3},
#     "orange": {"calories": 47, "protein": 0.9, "carbs": 12, "fats": 0.1},
#     "bread": {"calories": 265, "protein": 9, "carbs": 49, "fats": 3.2},
#     "cheese": {"calories": 402, "protein": 25, "carbs": 1.3, "fats": 33},
#     "yogurt": {"calories": 59, "protein": 10, "carbs": 3.6, "fats": 0.4},
#     "milk": {"calories": 42, "protein": 3.4, "carbs": 5, "fats": 1},
#     "soup": {"calories": 75, "protein": 4, "carbs": 10, "fats": 2}
# }

# def estimate_nutrition(food: str, grams: int = 200):
#     food = food.lower()
#     base = NUTRITION_PER_100G.get(food)

#     if not base:
#         return {"calories": 0, "protein": 0, "carbs": 0, "fats": 0}

#     factor = grams / 100.0

#     return {
#         "calories": round(base["calories"] * factor, 2),
#         "protein": round(base["protein"] * factor, 2),
#         "carbs": round(base["carbs"] * factor, 2),
#         "fats": round(base["fats"] * factor, 2)
#     }

NUTRITION_PER_100G = {#its a dictionary of all foods info
    # Prepared foods
    "pizza": {"calories": 266, "protein": 11, "carbs": 33, "fats": 10},
    "cheeseburger": {"calories": 303, "protein": 17, "carbs": 30, "fats": 14},
    "burger": {"calories": 295, "protein": 17, "carbs": 30, "fats": 14},
    "hot dog": {"calories": 290, "protein": 10, "carbs": 24, "fats": 18},
    "burrito": {"calories": 206, "protein": 8, "carbs": 23, "fats": 9},
    "pot pie": {"calories": 240, "protein": 7, "carbs": 22, "fats": 14},
    "meatloaf": {"calories": 250, "protein": 14, "carbs": 10, "fats": 18},
    "carbonara": {"calories": 190, "protein": 7, "carbs": 20, "fats": 9},
    "pasta": {"calories": 131, "protein": 5, "carbs": 25, "fats": 1},
    "sandwich": {"calories": 250, "protein": 10, "carbs": 30, "fats": 8},
    "bagel": {"calories": 250, "protein": 10, "carbs": 48, "fats": 2},
    "baguette": {"calories": 270, "protein": 9, "carbs": 56, "fats": 1},
    "pretzel": {"calories": 380, "protein": 9, "carbs": 80, "fats": 2},
    "dough": {"calories": 250, "protein": 8, "carbs": 50, "fats": 2},
    "mashed potato": {"calories": 88, "protein": 2, "carbs": 20, "fats": 0.4},

    # Desserts
    "ice cream": {"calories": 207, "protein": 3.5, "carbs": 24, "fats": 11},
    "ice pop": {"calories": 90, "protein": 0, "carbs": 23, "fats": 0},
    "cake": {"calories": 257, "protein": 4, "carbs": 38, "fats": 10},
    "trifle": {"calories": 190, "protein": 4, "carbs": 28, "fats": 7},
    "custard": {"calories": 122, "protein": 3.8, "carbs": 17, "fats": 4},

    #  Sauces / soups
    "guacamole": {"calories": 160, "protein": 2, "carbs": 9, "fats": 14},
    "consomme": {"calories": 15, "protein": 3, "carbs": 0, "fats": 0},
    "soup": {"calories": 75, "protein": 4, "carbs": 10, "fats": 2},
    "hot pot": {"calories": 120, "protein": 10, "carbs": 10, "fats": 5},

    # Vegetables
    "cabbage": {"calories": 25, "protein": 1.3, "carbs": 6, "fats": 0.1},
    "broccoli": {"calories": 34, "protein": 2.8, "carbs": 7, "fats": 0.4},
    "cauliflower": {"calories": 25, "protein": 1.9, "carbs": 5, "fats": 0.3},
    "zucchini": {"calories": 17, "protein": 1.2, "carbs": 3, "fats": 0.3},
    "cucumber": {"calories": 16, "protein": 0.8, "carbs": 4, "fats": 0.1},
    "artichoke": {"calories": 47, "protein": 3.3, "carbs": 11, "fats": 0.2},
    "bell pepper": {"calories": 31, "protein": 1, "carbs": 6, "fats": 0.3},
    "mushroom": {"calories": 22, "protein": 3.1, "carbs": 3.3, "fats": 0.3},
    "squash": {"calories": 45, "protein": 1, "carbs": 12, "fats": 0.2},

    #Fruits
    "apple": {"calories": 52, "protein": 0.3, "carbs": 14, "fats": 0.2},
    "granny smith": {"calories": 52, "protein": 0.3, "carbs": 14, "fats": 0.2},
    "banana": {"calories": 89, "protein": 1.1, "carbs": 23, "fats": 0.3},
    "orange": {"calories": 47, "protein": 0.9, "carbs": 12, "fats": 0.1},
    "lemon": {"calories": 29, "protein": 1.1, "carbs": 9, "fats": 0.3},
    "fig": {"calories": 74, "protein": 0.8, "carbs": 19, "fats": 0.3},
    "pineapple": {"calories": 50, "protein": 0.5, "carbs": 13, "fats": 0.1},
    "jackfruit": {"calories": 95, "protein": 1.7, "carbs": 23, "fats": 0.6},
    "custard apple": {"calories": 94, "protein": 2.1, "carbs": 23, "fats": 0.3},
    "pomegranate": {"calories": 83, "protein": 1.7, "carbs": 19, "fats": 1.2},

    #Grains / corn
    "corn": {"calories": 96, "protein": 3.4, "carbs": 21, "fats": 1.5},
    "ear of corn": {"calories": 96, "protein": 3.4, "carbs": 21, "fats": 1.5},

    #  Drinks
    "red wine": {"calories": 85, "protein": 0.1, "carbs": 2.6, "fats": 0},
    "espresso": {"calories": 9, "protein": 0.3, "carbs": 1.7, "fats": 0},
    "eggnog": {"calories": 88, "protein": 4.5, "carbs": 8, "fats": 5},
    "chocolate syrup": {"calories": 269, "protein": 3, "carbs": 70, "fats": 1},
}

def estimate_nutrition(food: str, grams: int = 200):
    food = food.lower()#prevents mismatch (Ex: PizZa, piZZa etc..)
    base = NUTRITION_PER_100G.get(food)

    if not base:
        return {"calories": 0, "protein": 0, "carbs": 0, "fats": 0}

    factor = grams / 100.0

    return {
        "calories": round(base["calories"] * factor, 2),
        "protein": round(base["protein"] * factor, 2),
        "carbs": round(base["carbs"] * factor, 2),
        "fats": round(base["fats"] * factor, 2),
    }
