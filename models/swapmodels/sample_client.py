import requests  
import base64  
  
def encode_image_to_base64(file_path):  
    with open(file_path, 'rb') as image_file:  
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')  
    return encoded_string  
  
def main():  
    # 画像ファイルのパスを指定  
    image1_path = './degawa.jpg'  
    image2_path = './afro.png'  
  
    # 画像をBase64エンコード  
    image1_base64 = encode_image_to_base64(image1_path)  
    image2_base64 = encode_image_to_base64(image2_path)  
  
    # APIエンドポイント  
    url = 'https://gpu.beavers-hive.com/swap/process_image'
  
    # リクエストボディ  
    payload = {  
        'image1': image1_base64,  
        'image2': image2_base64  
    }  
  
    # ヘッダ  
    headers = {  
        'Content-Type': 'application/json'  
    }  
  
    # POSTリクエストを送信  
    response = requests.post(url, json=payload, headers=headers)  
  
    if response.status_code == 200:  
        # レスポンスからBase64エンコードされた画像を取得  
        result = response.json()  
        output_image_base64 = result['image']  
  
        # Base64エンコードされた画像をデコードして保存  
        output_image_bytes = base64.b64decode(output_image_base64)  
        with open('output_from_api.jpg', 'wb') as output_image_file:  
            output_image_file.write(output_image_bytes)  
  
        print('Output image saved as output_from_api.jpg')  
    else:  
        print(f"Error: {response.status_code}")  
        print(response.text)  
  
if __name__ == '__main__':  
    main()  
