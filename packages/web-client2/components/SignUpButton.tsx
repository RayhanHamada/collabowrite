import { Button, Text } from '@chakra-ui/react';
import React from 'react';

export const SignUpButton: React.FC = (_props) => {
  return (
    <Button
      variant="outline"
      //   colorScheme="whiteAlpha"
      ringColor="white"
      size="sm"
      _hover={{ opacity: 0.7 }}
    >
      <Text color="white" cursor="pointer">
        Sign Up
      </Text>
    </Button>
  );
};
