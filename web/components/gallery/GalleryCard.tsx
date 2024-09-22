'use client';
import { Box } from '@chakra-ui/react';
import Image from 'next/image';

interface GalleryCardProps {
  name: string;
  image: string;
  prompt: string;
  isSelect: boolean;
  onClick: () => void;
}

export const GalleryCard = (props: GalleryCardProps) => {
  const { name, image } = props;
  return (
    <Box
      className={`flex flex-col items-center space-y-2 ${props.isSelect ? 'opacity-100' : 'opacity-15'}`}
      onClick={props.onClick}
    >
      <Box position="relative" height="130PX" width="97.5px">
        <Image
          src={image}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </Box>
      <Box className="text-center text-sm font-bold text-white">{name}</Box>
    </Box>
  );
};
