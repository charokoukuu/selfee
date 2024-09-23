'use client';
import { Box } from '@chakra-ui/react';
import { Island_Moments } from 'next/font/google';

const IslandMoments = Island_Moments({
  weight: '400',
  subsets: ['latin'],
});
export const Header = () => {
  return (
    <Box className="flex h-12 w-full items-center bg-black/30 text-white">
      <Box className={`flex pl-5 text-2xl ${IslandMoments.className}`}>
        Selfee
      </Box>
    </Box>
  );
};
