# descending food history
#saves and retrives food history
from datetime import datetime
from app.database import db#mongo client instance

food_log_collection = db["food_logs"]

def save_food_log(user_email: str, food: str, nutrition: dict):
    food_log_collection.insert_one({
        "user_email": user_email,
        "food": food,
        "nutrition": nutrition,
        "timestamp": datetime.utcnow()#universal time coordinated
    })

def get_food_logs(user_email: str):
    logs = (
        food_log_collection
        .find({"user_email": user_email})#filters by user
        .sort("timestamp", -1)  # newest first
    )

    result = []
    for log in logs:
        result.append({
            "_id": str(log["_id"]),#mongo is not json serializable so u convert to string to prevent api errors
            "food": log["food"],
            "nutrition": log["nutrition"],
            "timestamp": log["timestamp"]
        })

    return result
