import requests  
import base64  
import time  
  
# 画像を読み込み、Base64エンコードする  
def encode_image(image_path):  
    with open(image_path, 'rb') as img_file:  
        return base64.b64encode(img_file.read()).decode('utf-8')  
  
# テキストファイルからプロンプトを読み込む  
print('Reading prompts from prompts.txt')
txt_file_path = 'prompts.txt'  
with open(txt_file_path, 'r') as file:  
    prompts = file.readlines()  
  
# 改行文字を除去  
prompts = [prompt.strip() for prompt in prompts]  
  
image_paths = ['image.jpg']  
encoded_images = [encode_image(image_path) for image_path in image_paths]
print('Images encoded successfully.')  
  
# APIエンドポイント  
api_url = 'https://gpu.beavers-hive.com/api/generate'  
  
# 各プロンプトを取得して順次APIリクエストを送信  
for index, prompt in enumerate(prompts):  
    data = {  
        'images': encoded_images,  
        'prompt': prompt,  
        'negative_prompt': '(asymmetry, worst quality, low quality, illustration, 3d, 2d, painting, cartoons, sketch), open mouth, grayscale'  
    }  
    headers = {
    'Content-Type': 'application/json'
    }
    response = requests.post(api_url, json=data, headers=headers)
      
    # response = requests.post(api_url, json=data, timeout=10)
    if response.status_code == 200:  
        result = response.json()  
        generated_image_data = base64.b64decode(result['image'])  
        output_image_path = f'generated_image_{index}.png'  
        with open(output_image_path, 'wb') as f:  
            f.write(generated_image_data)  
    else:  
        print('Error:', response.json())  
      
    # 前のリクエストが完了するまで待つ  
    time.sleep(1)  # 必要に応じて待ち時間を調整  
  
print('All requests completed.')  
