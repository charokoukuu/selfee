from flask import Flask, request, jsonify  
import sys  
from photomaker.insightface_package import analyze_faces  
import torch  
import os  
from diffusers.utils import load_image  
from diffusers import EulerDiscreteScheduler  
from photomaker import PhotoMakerStableDiffusionXLPipeline  
from huggingface_hub import hf_hub_download  
from photomaker import FaceAnalysis2, analyze_faces  
import numpy as np  
from PIL import Image  
import io  
import base64  
from flask_cors import CORS  

app = Flask(__name__)  
CORS(app, resources={r"/*": {"origins": "*"}}, methods=['POST', 'OPTIONS'])
base_model_path = 'SG161222/RealVisXL_V4.0'  
face_detector = FaceAnalysis2(providers=['CUDAExecutionProvider'], allowed_modules=['detection', 'recognition'])  
face_detector.prepare(ctx_id=0, det_size=(640, 640))  
  
try:  
    if torch.cuda.is_available():  
        device = "cuda"  
    elif sys.platform == "darwin" and torch.backends.mps.is_available():  
        device = "mps"  
    else:  
        device = "cpu"  
except:  
    device = "cpu"  
  
pipe = PhotoMakerStableDiffusionXLPipeline.from_pretrained(  
    base_model_path,  # can change to any base model based on SDXL  
    torch_dtype=torch.float16,  
    use_safetensors=True,  
    variant="fp16"  
).to(device)  
  
photomaker_path = hf_hub_download(repo_id="TencentARC/PhotoMaker-V2", filename="photomaker-v2.bin", repo_type="model")  
pipe.load_photomaker_adapter(  
    os.path.dirname(photomaker_path),  
    subfolder="",  
    weight_name=os.path.basename(photomaker_path),  
    trigger_word="img"  # define the trigger word  
)  
pipe.scheduler = EulerDiscreteScheduler.from_config(pipe.scheduler.config)  
pipe.fuse_lora()  
  
@app.route('/generate', methods=['POST'])  
def generate_image():  
    try:  
        data = request.json
        image_data_list = data['images']  
        prompt = data['prompt']  
        negative_prompt = data['negative_prompt']  
  
        input_id_images = []  
        for image_data in image_data_list:  
            # Decode the base64-encoded image data  
            image_bytes = base64.b64decode(image_data)  
            image = Image.open(io.BytesIO(image_bytes))  
            input_id_images.append(image)  
  
        generator = torch.Generator(device=device).manual_seed(42)  
        num_steps = 20  
        id_embed_list = []  

  
        for img in input_id_images:  
            img = np.array(img)  
            img = img[:, :, ::-1]  
            faces = analyze_faces(face_detector, img)  
            if len(faces) > 0:  
                id_embed_list.append(torch.from_numpy((faces[0]['embedding'])))  
  
        if len(id_embed_list) == 0:  
            return jsonify({'error': 'No face detected, please update the input face image(s)'}), 400  
  
        id_embeds = torch.stack(id_embed_list)  
  
        gen_images = pipe(  
            prompt=prompt,  
            input_id_images=input_id_images,  
            negative_prompt=negative_prompt,  
            num_images_per_prompt=1,  
            num_inference_steps=num_steps,  
            id_embeds=id_embeds,  
            start_merge_step=10,  
            generator=generator,  
        ).images[0]  
  
        img_byte_arr = io.BytesIO()  
        gen_images.save(img_byte_arr, format='PNG')  
        img_byte_arr = img_byte_arr.getvalue()  
  
        # Encode the generated image to base64  
        encoded_img = base64.b64encode(img_byte_arr).decode('utf-8')  
  
        return jsonify({'image': encoded_img})  
  
    except Exception as e:  
        return jsonify({'error': str(e)}), 500  

if __name__ == '__main__':  
    app.run(port=8000)