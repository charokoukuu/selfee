/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable @next/next/no-img-element */
'use client';
import generateAndSwapImages from '@/api/generateImage';
import { CameraButton } from '@/components/buttons/CameraButton';
import { DownloadButton } from '@/components/buttons/DownloadButton';
import { SubmitButton } from '@/components/buttons/SubmitButton';
import { SkeltonCard } from '@/components/cards/SkeltonCard';
import Carousel from '@/components/gallery/Carousel';
import { GalleryCard } from '@/components/gallery/GalleryCard';
import Skeleton from '@/components/loading/Skelton';
import { backgroundTypes, templates } from '@/options/template';
import { Box, HStack, VStack } from '@chakra-ui/react';
import { useRef, useState } from 'react';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string>(''); // Base64文字列として保存
  const [generatedImage, setGeneratedImage] = useState<string | null>(null); // プレビュー用
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>('');
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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

      setIsProcessing(true); // 処理中
      // 画像生成および交換処理
      const resultImageBase64 = await generateAndSwapImages(
        base64Image,
        prompt,
      );
      setIsProcessing(false); // 処理完了
      setTimeout(() => {
        handleScroll();
      }, 200);

      // プレビュー用のデータURIを生成
      setGeneratedImage(`data:image/png;base64,${resultImageBase64}`);

      // Base64 から Blob を生成し、ダウンロード用の URL を作成
      const blob = base64ToBlob(resultImageBase64, 'image/png');
      const url = URL.createObjectURL(blob);

      setDownloadUrl(url); // ダウンロード用の URL を設定
    } catch (error) {
      setIsProcessing(false); // エラー時は処理中を解除
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

  const [selectTemplate, setSelectTemplate] = useState<string>('');
  const [background, setBackground] = useState<backgroundTypes[]>([]);
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
                  isSelect={
                    selectTemplate === '' || selectTemplate === template.prompt
                  }
                  onClick={() => {
                    setSelectTemplate(template.prompt);
                    setPrompt(template.prompt);
                    setBackground(template.background ?? []);
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </SkeltonCard>
      <div>
        <div
          className={`transition-max-height overflow-hidden duration-500 ease-in-out ${
            background.length > 0
              ? 'max-h-[500px] opacity-100'
              : 'max-h-0 opacity-0'
          }`}
        >
          {background.length > 0 && (
            <SkeltonCard>
              <Carousel background={background} onSetPrompt={setPrompt} />
            </SkeltonCard>
          )}
        </div>
      </div>
      <SubmitButton
        isDisable={isProcessing || !selectedImage || !selectTemplate}
        className="font-bold"
        onClick={() => {
          setTimeout(() => {
            handleScroll();
          }, 200);
          handleGenerateAndPreview();
        }}
      >
        Let’s Generate !
      </SubmitButton>
      {/* プレビューを表示 */}
      {isProcessing && <Skeleton />}
      {generatedImage && (
        <VStack>
          <img
            className="m-7 size-[80vw] rounded-lg border-2 bg-white/20 shadow-[3px_2px_18.9px_0px_rgba(0,81,255,0.25)] transition-all duration-150 ease-in-out hover:translate-y-1 active:translate-y-2 active:shadow-[1px_1px_10px_0px_rgba(0,81,255,0.25)]"
            src={generatedImage}
            alt="Generated Preview"
          />
        </VStack>
      )}
      {downloadUrl && (
        <DownloadButton
          downloadUrl={downloadUrl ?? ''}
          fileName={'swapped_image.png'}
        >
          Save Image
        </DownloadButton>
      )}

      <Box className="h-12" ref={bottomRef} />
    </Box>
  );
}
