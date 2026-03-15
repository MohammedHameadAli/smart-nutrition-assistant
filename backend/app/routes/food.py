#food history descending (recent one)
from fastapi import APIRouter, UploadFile, File, Depends
from app.services.food_recognition import recognize_food
from app.services.nutrition_service import estimate_nutrition
from app.dependencies import get_current_user
from app.services.food_log_service import save_food_log, get_food_logs

router = APIRouter(prefix="/food", tags=["Food"])

@router.post("/analyze")
async def analyze_food(
    image: UploadFile = File(...),#upload food from required input i.e(File(...))
    user=Depends(get_current_user)#ensures authentication
):
    image_bytes = await image.read()#reads image into bytes to send for mobilenetv2
    food_result = recognize_food(image_bytes)#calls mobilenetv2

    if food_result["food"] == "unknown":
        return {
            "food": "unknown",
            "confidence": food_result["confidence"],
            "message": "Food could not be identified confidently"
        }

    grams = 250#assuming fixed portion size
    nutrition = estimate_nutrition(food_result["food"], grams)#connects to nutrition service

    #  user is already email string
    save_food_log(
        user_email=user,
        food=food_result["food"],
        nutrition=nutrition
    )

    return {
        "food": food_result["food"],
        "confidence": food_result["confidence"],
        "nutrition": nutrition
    }

@router.get("/history")
def get_food_history(user=Depends(get_current_user)):#fetches foodlogs for already logged in users
    logs = get_food_logs(user)
    return {"history": logs}

#returns json response