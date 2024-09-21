import { Box } from '@chakra-ui/react';

interface SkeltonCardProps {
  children?: React.ReactNode;
}

export const SkeltonCard = ({ children }: SkeltonCardProps) => {
  return <Box className="mx-3 my-2 rounded-xl bg-white/20 p-3">{children}</Box>;
};
