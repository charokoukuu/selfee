'use client';
import { Box, Button } from '@chakra-ui/react';
import { useRef } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  isDisable?: boolean;
  onClick?: () => void;
  downloadUrl: string;
  fileName: string;
}
export const DownloadButton = ({
  children,
  className,
  isDisable = false,
  onClick,
  downloadUrl,
  fileName,
}: Props) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleDownload = () => {
    if (onClick) onClick(); // カスタムのonClickがあれば実行
    if (linkRef.current) {
      linkRef.current.click(); // ダウンロードリンクをクリック
    }
  };

  return (
    <Box className={`w-full p-3 ${className}`}>
      <Button
        type="button"
        isDisabled={isDisable}
        onClick={handleDownload}
        className={`h-12 w-full rounded-md font-bold ${
          isDisable
            ? 'cursor-not-allowed bg-gray-400'
            : 'bg-gradient-to-r from-[#ff8000] to-[#b9d619] text-white transition-transform duration-150 ease-in-out active:scale-95'
        }`}
      >
        {children}
      </Button>
      <a
        href={downloadUrl}
        download={fileName}
        ref={linkRef}
        style={{ display: 'none' }}
      >
        Download
      </a>
    </Box>
  );
};
