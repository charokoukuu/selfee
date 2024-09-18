import { Box } from '@chakra-ui/react';

interface SkeltonCardProps {
  children?: React.ReactNode;
}

export const SkeltonCard = ({ children }: SkeltonCardProps) => {
  return <Box className="m-3 rounded-md bg-white/20 p-3">{children}</Box>;
};
