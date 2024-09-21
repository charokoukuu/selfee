const generateAndSwapImages = async (imageBase64: string, prompt: string) => {
    // 画像生成APIにリクエストを送る関数
    const generateImage = async (encodedImage: string): Promise<string> => {
        const response = await fetch('https://gpu.beavers-hive.com/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                images: [encodedImage], // プレフィックスなしで送信
                prompt,
                negative_prompt:
                    '(asymmetry, worst quality, low quality, illustration, 3d, 2d, painting, cartoons, sketch), open mouth, grayscale',
            }),
        });

        if (response.ok) {
            const data = await response.json();
            return data.image; // 生成された画像のBase64データを返す
        } else {
            const error = await response.json();
            throw new Error(`Error in image generation: ${error.message}`);
        }
    };

    // 画像交換APIにリクエストを送る関数
    const swapImages = async (image1Base64: string, image2Base64: string) => {
        const response = await fetch('https://gpu.beavers-hive.com/swap/process_image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image1: image1Base64, // プレフィックスなしで送信
                image2: image2Base64, // プレフィックスなしで送信
            }),
        });

        if (response.ok) {
            const data = await response.json();
            return data.image; // 交換後の画像のBase64データを返す
        } else {
            const error = await response.json();
            throw new Error(`Error in image swapping: ${error.message}`);
        }
    };

    try {
        // 1. 画像生成APIを叩いて新しい画像を生成
        console.log('Generating image...');
        const generatedImageBase64 = await generateImage(imageBase64.replace(/^data:image\/[a-z]+;base64,/, ''));

        // 2. 生成された画像と元画像を使って画像交換APIを叩く
        console.log('Swapping images...');
        const swappedImageBase64 = await swapImages(
            imageBase64.replace(/^data:image\/[a-z]+;base64,/, ''),
            generatedImageBase64.replace(/^data:image\/[a-z]+;base64,/, '')
        );

        // 3. 最終的な交換後の画像のBase64データを返す
        return swappedImageBase64;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export default generateAndSwapImages;