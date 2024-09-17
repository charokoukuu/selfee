import { Box, Button, Center, VStack } from '@chakra-ui/react';
import CameraIcon from '../icons/CmeraIcon';

export const CameraButton = () => {
  return (
    <Button>
      <Box className="size-[162px] rounded-lg border-2 bg-white/20 shadow-[3px_2px_18.9px_0px_rgba(0,81,255,0.25)] transition-all duration-150 ease-in-out hover:translate-y-1 active:translate-y-2 active:shadow-[1px_1px_10px_0px_rgba(0,81,255,0.25)]">
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
      </Box>
    </Button>
  );
};
