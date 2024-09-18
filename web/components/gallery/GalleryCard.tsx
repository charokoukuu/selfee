import { Box } from '@chakra-ui/react';

interface GalleryCardProps {
  name: string;
  prompt: string;
  image: string;
}

export const GalleryCard = (props: GalleryCardProps) => {
  const { name, prompt, image } = props;
  return (
    <Box className="flex flex-col space-y-1">
      <Box>
        <img src={image} alt={name} className="h-36 w-auto rounded-md" />
      </Box>
      <Box className="text-center text-sm font-bold text-white">{name}</Box>
    </Box>
  );
};
