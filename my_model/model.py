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

