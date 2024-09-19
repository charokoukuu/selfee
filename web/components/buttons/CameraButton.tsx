'use client';
import { Box, Button, VStack } from '@chakra-ui/react';
import { useRef } from 'react';
import CameraIcon from '../icons/CameraIcon';

interface CameraButtonProps {
  selectedImage: string;
  setSelectedImage: (image: string) => void;
}
export const CameraButton = ({
  selectedImage,
  setSelectedImage,
}: CameraButtonProps) => {
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click(); // ファイル選択ダイアログを開く
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string); // Base64形式で画像を取得して状態にセット
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Button onClick={handleButtonClick}>
        <Box
          className="size-[162px] rounded-lg border-2 bg-white/20 shadow-[3px_2px_18.9px_0px_rgba(0,81,255,0.25)] transition-all duration-150 ease-in-out hover:translate-y-1 active:translate-y-2 active:shadow-[1px_1px_10px_0px_rgba(0,81,255,0.25)]"
          style={{
            backgroundImage: selectedImage
              ? `url(${selectedImage})`
              : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {!selectedImage && (
            <Box className="p-3 text-xl font-bold text-white">
              <VStack justify="center" spacing={1}>
                <CameraIcon width={71} height={71} color="#fff" />
                <Box>
                  Choose
                  <br />
                  Image
                </Box>
              </VStack>
            </Box>
          )}
        </Box>
      </Button>
      {/* 隠しファイル入力 */}
      <input
        type="file"
        ref={inputFileRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleFileChange}
      />
    </>
  );
};
