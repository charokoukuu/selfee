import { Box } from '@chakra-ui/react';
import Image from 'next/image';

interface GalleryCardProps {
  name: string;
  image: string;
  prompt: string;
}

export const GalleryCard = (props: GalleryCardProps) => {
  const { name, image } = props;
  return (
    <Box className="flex flex-col items-center space-y-2">
      <Box position="relative" height="200px" width="150px">
        <Image
          src={image}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </Box>
      <Box className="text-center text-sm font-bold text-white">{name}</Box>
    </Box>
  );
};
