import { CollaboWriteLogo } from '@/components/CollaboWriteLogo';
import { SignUpForm } from '@/components/SignUpForm';
import { Container } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';

export default function SignUp() {
  return (
    <Container
      maxW="full"
      h="100vh"
      marginX="auto"
      bgColor="black"
      textAlign="center"
      paddingTop="16"
    >
      <CollaboWriteLogo fontSize="2xl" />
      <SignUpForm />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.log(process.env.NEXT_PUBLIC_SUPABASE_KEY);
  return {
    props: {},
  };
};
