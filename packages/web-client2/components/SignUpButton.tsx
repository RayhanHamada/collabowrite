import { Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { MouseEventHandler } from 'react';

export const SignUpButton: React.FC = (_props) => {
  const router = useRouter();

  const navigateToSignUp: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    router.push('/signup', undefined);
  };

  return (
    <Button
      variant="outline"
      ringColor="white"
      size="sm"
      _hover={{ opacity: 0.7 }}
      onClick={navigateToSignUp}
    >
      <Text color="white" cursor="pointer">
        Sign Up
      </Text>
    </Button>
  );
};
