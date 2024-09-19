'use client';
import { Box, Button, Skeleton } from '@chakra-ui/react';

interface SubmitButtonProps {
  children: React.ReactNode;
  className?: string;
  isDisable?: boolean;
  onClick?: () => void;
}
export const SubmitButton = ({
  children,
  className,
  isDisable = false,
  onClick,
}: SubmitButtonProps) => {
  return (
    <Box className={`w-full p-3 ${className}`}>
      <Button
        type="submit"
        isDisabled={isDisable}
        onClick={onClick}
        className={`h-12 w-full rounded-md ${
          isDisable
            ? 'cursor-not-allowed bg-gray-400' // 無効化時のスタイル
            : 'bg-gradient-to-r from-[#9862D5] to-[#6072FF] text-white transition-transform duration-150 ease-in-out active:scale-95'
        }`}
      >
        {children}
      </Button>
      <Skeleton className="rounded-lg">
        <div className="bg-default-300 h-24 rounded-lg">a</div>
      </Skeleton>
    </Box>
  );
};
