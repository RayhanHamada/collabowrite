import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { MouseEventHandler, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLock,
  AiOutlineMail,
} from 'react-icons/ai';

type FormFieldValue = {
  email: string;
  password: string;
};

export const SignInForm: React.FC = () => {
  const [passwordVisible, togglePasswordVisible] = useState(false);

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormFieldValue>();

  const onSubmit = handleSubmit((data) => {
    console.log(`${data.email} ${data.password}`);
  });

  const handleSignIn: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const handleShowPass: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    togglePasswordVisible((s) => !s);
  };

  return (
    <Container
      paddingX="16"
      paddingY="16"
      marginTop="16"
      border="1px"
      rounded="2xl"
      justifyContent="space-between"
      borderRight="8px"
      borderTop="8px"
      borderColor="white"
    >
      <Text textColor="white" fontSize="3xl">
        Sign In
      </Text>
      <FormControl id="email">
        <FormLabel textColor="white">Email</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <AiOutlineMail color="white" />
          </InputLeftElement>
          <Input
            type="email"
            placeholder="example.123@example.com"
            _placeholder={{ opacity: 0.6 }}
            textColor="white"
            borderTop="4px"
            borderRight="4px"
            {...register('email')}
          />
        </InputGroup>
        <FormErrorMessage>{errors.email}</FormErrorMessage>
      </FormControl>
      <Box h="8"></Box>
      <FormControl id="password">
        <FormLabel textColor="white">Password</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <AiOutlineLock color="white" />
          </InputLeftElement>
          <Input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Your Super Secret Password"
            _placeholder={{ opacity: 0.6 }}
            textColor="white"
            borderTop="4px"
            borderRight="4px"
            {...register('password')}
          />
          <InputRightElement>
            <IconButton
              aria-label="Show Password"
              icon={
                passwordVisible ? (
                  <AiOutlineEyeInvisible size="1.5em" color="white" />
                ) : (
                  <AiOutlineEye size="1.5em" color="white" />
                )
              }
              bgColor="transparent"
              // textColor="whiteAlpha.700"
              h="1.75rem"
              size="sm"
              _hover={{ opacity: 0.7 }}
              _focus={{ outline: 'none', boxShadow: 'none' }}
              _
              onClick={handleShowPass}
            />
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{errors.password}</FormErrorMessage>
      </FormControl>
      <Box h="8"></Box>
      <Button w="full" onClick={handleSignIn} _hover={{ opacity: 0.7 }}>
        Sign In
      </Button>
    </Container>
  );
};
