import io
from PIL import Image
import torch
from torchvision import models, transforms

device = "cuda" if torch.cuda.is_available() else "cpu"

# Load pretrained MobileNetV2
model = models.mobilenet_v2(weights=models.MobileNet_V2_Weights.DEFAULT)
model.eval()
model.to(device)

# ImageNet preprocessing
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

FOOD_KEYWORDS = [
    # already prepared foods
    "pizza",
    "cheeseburger",
    "burger",
    "hotdog",
    "hot dog",
    "sandwich",
    "burrito",
    "pot pie",
    "meatloaf",
    "carbonara",
    "pasta",
    "spaghetti",
    "bread",
    "bagel",
    "baguette",
    "pretzel",
    "dough",
    "mashed potato",
    "ice cream",
    "ice pop",
    "cake",
    "trifle",
    "guacamole",
    "consomme",
    "hot pot",

    # vgetables
    "cabbage",
    "broccoli",
    "cauliflower",
    "zucchini",
    "squash",
    "cucumber",
    "artichoke",
    "bell pepper",
    "pepper",
    "cardoon",
    "mushroom",

    # fruits
    "banana",
    "apple",
    "granny smith",
    "strawberry",
    "orange",
    "lemon",
    "fig",
    "pineapple",
    "jackfruit",
    "custard apple",
    "pomegranate",

    # Corn-grains
    "corn",
    "ear of corn",
    "acorn",

    # Fungi
    "agaric",
    "gyromitra",
    "stinkhorn",
    "earth star",
    "hen of the woods",
    "bolete",
    "coral fungus",

    # Drinks
    "red wine",
    "espresso",
    "eggnog",
    "chocolate syrup",

    # Misc
    "salad",
    "steak",
    "fried chicken",
    "sushi"
]

def recognize_food(image_bytes: bytes):
    """
    Takes raw image bytes and returns detected food + confidence
    """

    # Convert bytes -> PIL Image
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    # Preprocess
    input_tensor = transform(image).unsqueeze(0).to(device)

    # Predict
    with torch.no_grad():
        outputs = model(input_tensor)
        probs = torch.softmax(outputs, dim=1)
        confidence, class_index = torch.max(probs, dim=1)

    confidence = round(confidence.item() * 100, 2)

    #Imagenet label
    imagenet_label = models.MobileNet_V2_Weights.DEFAULT.meta["categories"][
        class_index.item()
    ].lower()

    # Match to food keywords
    detected_food = "unknown"
    for food in FOOD_KEYWORDS:
        if food in imagenet_label:
            detected_food = food
            break

    return {
        "food": detected_food,
        "confidence": confidence,
        "raw_label": imagenet_label
    }
