import { CollaboWriteLogo } from '@/components/CollaboWriteLogo';
import { SignInForm } from '@/components/SignInForm';
import { Container, Flex } from '@chakra-ui/react';

export default function SignIn() {
  return (
    <Container
      maxW="full"
      h="90vh"
      marginX="auto"
      bgColor="black"
      textAlign="center"
      paddingTop="16"
    >
      <CollaboWriteLogo fontSize="2xl" />
      <Flex
        flexDir="column"
        // justifyContent="center"
        alignItems="center"
        h="full"
        paddingTop="4"
      >
        <SignInForm />
      </Flex>
    </Container>
  );
}
