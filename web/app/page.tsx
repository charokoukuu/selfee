'use client';
import generateAndSwapImages from '@/api/generateImage';
import { CameraButton } from '@/components/buttons/CameraButton';
import { SubmitButton } from '@/components/buttons/SubmitButton';
import { SkeltonCard } from '@/components/cards/SkeltonCard';
import Carousel from '@/components/gallery/Carousel';
import { GalleryCard } from '@/components/gallery/GalleryCard';
import { templates } from '@/options/template';
import { Box, HStack } from '@chakra-ui/react';
import { useState } from 'react';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string>(''); // Base64文字列として保存
  const [generatedImage, setGeneratedImage] = useState<string | null>(null); // プレビュー用
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null); // ダウンロード用

  // 画像を生成し、プレビューとダウンロードリンクをセット
  const handleGenerateAndPreview = async () => {
    if (!selectedImage) {
      alert('Please select an image file.');
      return;
    }

    try {
      // プレフィックスが含まれているかチェックし、除去
      const base64Image = selectedImage.replace(
        /^data:image\/[a-z]+;base64,/,
        '',
      );

      const prompt =
        'a man of img Portrait photo in front of a beautiful background, softly blurred, vibrant colors, natural lighting, head and shoulders in frame, serene and confident expression';

      // 画像生成および交換処理
      const resultImageBase64 = await generateAndSwapImages(
        base64Image,
        prompt,
      );

      // プレビュー用のデータURIを生成
      setGeneratedImage(`data:image/png;base64,${resultImageBase64}`);

      // Base64 から Blob を生成し、ダウンロード用の URL を作成
      const blob = base64ToBlob(resultImageBase64, 'image/png');
      const url = URL.createObjectURL(blob);

      setDownloadUrl(url); // ダウンロード用の URL を設定
    } catch (error) {
      console.error('Error in processing images:', error);
    }
  };

  // Base64 文字列を Blob に変換する関数
  const base64ToBlob = (base64: string, contentType: string): Blob => {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  };

  return (
    <Box>
      <HStack justify="center" className="m-10 mt-14">
        <CameraButton
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      </HStack>
      <SkeltonCard>
        <Box className="flex flex-row space-x-4 overflow-x-auto px-3 pt-3 scrollbar-none">
          {templates.map((template) => {
            return (
              <Box key={template.name} className="shrink-0">
                <GalleryCard
                  name={template.name}
                  prompt={template.prompt}
                  image={template.image}
                />
              </Box>
            );
          })}
        </Box>
      </SkeltonCard>
      <SkeltonCard>
        <Carousel />
      </SkeltonCard>
      <SubmitButton
        isDisable={false}
        className="font-bold"
        onClick={handleGenerateAndPreview}
      >
        Let’s Generate !
      </SubmitButton>
      {/* プレビューを表示 */}
      {generatedImage && (
        <div>
          <h3>Preview:</h3>
          <img
            src={generatedImage}
            alt="Generated Preview"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      )}

      {/* ダウンロードリンクを表示 */}
      {downloadUrl && (
        <a href={downloadUrl} download="swapped_image.png">
          Download Swapped Image
        </a>
      )}
    </Box>
  );
}
