import timm
import torch
from PIL import Image
from torchvision import transforms
import requests
from io import BytesIO


def load_model():
    """Load the pre-trained model."""
    model = timm.create_model("hf_hub:timm/vit_large_patch14_clip_336.laion2b_ft_in12k_in1k_inat21", pretrained=True)
    model.eval()
    return model


def get_label_names():
    """Fetch the class labels from the Hugging Face Hub."""
    config_url = "https://huggingface.co/timm/vit_large_patch14_clip_336.laion2b_ft_in12k_in1k_inat21/resolve/main/config.json"
    response = requests.get(config_url)
    response.raise_for_status()
    config = response.json()
    return config["label_names"]


def preprocess_image(image_url):
    """Fetch and preprocess the image."""
    preprocess = transforms.Compose([
        transforms.Resize(336),
        transforms.CenterCrop(336),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])

    response = requests.get(image_url)
    response.raise_for_status()
    image = Image.open(BytesIO(response.content))
    input_tensor = preprocess(image).unsqueeze(0)  
    return input_tensor


def predict_species(model, image_url, label_names):
    """Make a prediction using the model."""
    input_tensor = preprocess_image(image_url)


    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = model.to(device)
    input_tensor = input_tensor.to(device)

    with torch.no_grad():
        output = model(input_tensor)
        _, predicted_class = torch.max(output, 1)


    predicted_species = label_names[predicted_class.item()]
    return predicted_species
