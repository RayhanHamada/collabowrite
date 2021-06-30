import { Box, Center, Flex, Spacer } from '@chakra-ui/react';
import React from 'react';
import { CollaboWriteLogo } from './CollaboWriteLogo';
import { SignInButton } from './SignInButton';
import { SignUpButton } from './SignUpButton';

export const Navbar: React.FC = (_props) => {
  return (
    <Flex
      w="full"
      bgColor="black"
      height="16"
      borderBottom="1px"
      borderColor="white"
      paddingX="8"
      position="fixed"
      zIndex="10"
    >
      <Center>
        <Box>
          <CollaboWriteLogo fontSize="2xl" />
        </Box>
      </Center>
      <Spacer />
      <Center>
        <SignInButton />
      </Center>
      <Center paddingLeft="2">
        <SignUpButton />
      </Center>
    </Flex>
  );
};
