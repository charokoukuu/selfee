import { CameraButton } from '@/components/buttons/CameraButton';
import { SubmitButton } from '@/components/buttons/SubmitButton';
import { SkeltonCard } from '@/components/cards/SkeltonCard';
import Carousel from '@/components/gallery/Carousel';
import { GalleryCard } from '@/components/gallery/GalleryCard';
import { templates } from '@/options/template';
import { Box, Button, HStack } from '@chakra-ui/react';
export default function Home() {
  return (
    <Box>
      <HStack justify="center" className="m-10 mt-14">
        <CameraButton />
      </HStack>
      <SkeltonCard>
        <Box className="scrollbar-none flex flex-row space-x-4 overflow-x-auto px-3 pt-3">
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
      <SubmitButton isDisable={false} className="font-bold">
        Let’s Generate !
      </SubmitButton>
    </Box>
  );
}
