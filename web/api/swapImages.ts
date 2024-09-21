export const runtime = 'edge';
import base64 from 'base64-js';

const swapImages = async (image1Path: string, image2Path: string) => {
    // 画像をBase64にエンコードする関数
    const encodeImageToBase64 = async (filePath: string): Promise<string> => {
        const response = await fetch(filePath);
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        return base64.fromByteArray(new Uint8Array(arrayBuffer));
    };

    // 画像1と画像2をエンコード
    const image1Base64 = await encodeImageToBase64(image1Path);
    const image2Base64 = await encodeImageToBase64(image2Path);

    // APIにリクエスト
    const response = await fetch('https://gpu.beavers-hive.com/swap/process_image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image1: image1Base64,
            image2: image2Base64,
        }),
    });

    if (response.ok) {
        const data = await response.json();
        const outputImageBase64 = data.image;

        // Base64エンコードされた画像をデコードして返す
        return outputImageBase64;
    } else {
        const error = await response.json();
        throw new Error(`Error: ${error}`);
    }
};

export default swapImages;