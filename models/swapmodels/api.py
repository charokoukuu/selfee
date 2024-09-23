from flask import Flask, request, jsonify  
import base64  
import os  
import subprocess  
from flask_cors import CORS  

  
app = Flask(__name__)  
CORS(app)
@app.route('/process_image', methods=['POST'])  
def process_image():  
    # Base64で画像を受け取り、それぞれinput.jpgとtarget.jpgに保存  
    data = request.json  
    img1_data = base64.b64decode(data['image1'])  
    img2_data = base64.b64decode(data['image2'])  
  
    with open('input.jpg', 'wb') as f:  
        f.write(img1_data)  
      
    with open('target.png', 'wb') as f:  
        f.write(img2_data)  
  
    # 外部スクリプトを実行  
    subprocess.run(['python', 'run.py', '--headless'])  
  
    # output.jpgが更新されるのを待つ  
    if not os.path.exists('output.png'):  
        return "Error: output.png not found", 500  
  
    # output.jpgをレスポンスとして返す  
    with open('output.png', 'rb') as f:  
        img_bytes = f.read()  
        img_b64 = base64.b64encode(img_bytes).decode('utf-8')  
  
    # output.jpgを削除  
    os.remove('output.png')  
  
    return jsonify({'image': img_b64})  
  
if __name__ == '__main__':  
    app.run(debug=True, port=7860)  
