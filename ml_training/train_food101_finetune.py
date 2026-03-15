import tensorflow as tf
from tensorflow.keras.utils import image_dataset_from_directory

IMG_SIZE = (224, 224)
BATCH_SIZE = 32
INITIAL_EPOCHS = 5
FINE_TUNE_EPOCHS = 3

DATASET_PATH = r"C:\Users\Hamea\OneDrive\Desktop\foodrecognition app\food-101\food-101\images"  # adjust if needed

# Load dataset
train_ds = image_dataset_from_directory(
    DATASET_PATH,
    validation_split=0.2,
    subset="training",
    seed=123,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE
)

val_ds = image_dataset_from_directory(
    DATASET_PATH,
    validation_split=0.2,
    subset="validation",
    seed=123,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE
)

class_names = train_ds.class_names

AUTOTUNE = tf.data.AUTOTUNE
train_ds = train_ds.prefetch(AUTOTUNE)
val_ds = val_ds.prefetch(AUTOTUNE)

# Base model
base_model = tf.keras.applications.MobileNetV2(
    input_shape=IMG_SIZE + (3,),
    include_top=False,
    weights="imagenet"
)

# 🔹 Freeze base model (Phase 1)
base_model.trainable = False

# Model
model = tf.keras.Sequential([
    base_model,
    tf.keras.layers.GlobalAveragePooling2D(),
    tf.keras.layers.Dense(len(class_names), activation="softmax")
])

# Phase 1 compile
model.compile(
    optimizer="adam",
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

print("🚀 Phase 1: Training classifier head")
model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=INITIAL_EPOCHS
)

# 🔥 Phase 2: Fine-tuning
print("🔥 Phase 2: Fine-tuning top layers")

base_model.trainable = True

# Unfreeze top layers only
FINE_TUNE_AT = len(base_model.layers) - 40

for layer in base_model.layers[:FINE_TUNE_AT]:
    layer.trainable = False

# Recompile with LOW learning rate
model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-5),
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=FINE_TUNE_EPOCHS
)

# Save final model
model.save("food101_model_finetuned.h5")

# Save labels
with open("food101_labels.txt", "w") as f:
    for name in class_names:
        f.write(name + "\n")

print("✅ Fine-tuning complete. Model saved.")
