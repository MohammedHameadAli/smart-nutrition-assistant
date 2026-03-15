import json

with open("imagenet-simple-labels.json", "r") as f:
    labels = json.load(f)

labels_dict = {str(i): label for i, label in enumerate(labels)}

with open("backend/app/ml/imagenet_labels.json", "w") as f:
    json.dump(labels_dict, f, indent=2)
