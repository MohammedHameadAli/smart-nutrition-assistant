from pydantic import BaseModel
from datetime import datetime

class FoodLog(BaseModel):
    user_email: str
    food_name: str
    calories: int
    protein: float
    carbs: float
    fats: float
    created_at: datetime = datetime.utcnow()
