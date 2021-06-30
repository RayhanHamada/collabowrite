import { Box, Text, TypographyProps } from '@chakra-ui/react';
import React from 'react';

type Props = {
  fontSize: TypographyProps['fontSize'];
};

export const CollaboWriteLogo: React.FC<Props> = ({ fontSize }) => {
  return (
    <Box>
      <Text fontSize={fontSize} fontWeight="normal" color="white">
        CollaboWrite
      </Text>
    </Box>
  );
};
