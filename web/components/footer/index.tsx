'use client';
/* eslint-disable react/no-unescaped-entities */
import { Box } from '@chakra-ui/react';
import { Island_Moments } from 'next/font/google';

const IslandMoments = Island_Moments({
  weight: '400',
  subsets: ['latin'],
});

export const Footer = () => {
  return (
    <Box className="fixed bottom-0 left-0 flex h-12 w-full items-center justify-center bg-black/30 text-sm text-white">
      <Box className={`flex text-center text-2xl ${IslandMoments.className}`}>
        @Beaver's Hive
      </Box>
    </Box>
  );
};
