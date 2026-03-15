from pydantic import BaseModel

class FoodResponse(BaseModel):
    food_name: str
    calories: int
    protein: float
    carbs: float
    fats: float
