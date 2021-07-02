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
import { yupResolver } from '@hookform/resolvers/yup';
import { FormEventHandler, MouseEventHandler, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLock,
  AiOutlineMail,
} from 'react-icons/ai';
import * as yup from 'yup';

type FormFieldValue = {
  email: string;
  password: string;
};

const formFieldSchema = yup.object().shape({
  email: yup.string().email().required('Email required'),
  password: yup.string().required('Password required'),
});

export const SignInForm: React.FC = () => {
  const [passwordVisible, togglePasswordVisible] = useState(false);

  const {
    formState: { errors, isValid, isSubmitting },
    register,
    handleSubmit,
  } = useForm<FormFieldValue>({
    resolver: yupResolver(formFieldSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(`${data.email} ${data.password}`);
  });

  const handleSignIn: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(errors.password);
    console.log(errors.email);
    console.log(isValid);
    if (!errors) {
      onSubmit();
    }
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
      <form onSubmit={handleSignIn}>
        <FormControl id="email" isInvalid={Boolean(errors.email)}>
          <FormLabel textColor="white">Email</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <AiOutlineMail color="white" />
            </InputLeftElement>
            <Input
              type="email"
              textColor="white"
              placeholder="example.123@example.com"
              borderTop="4px"
              borderRight="4px"
              _placeholder={{ opacity: 0.7 }}
              {...register('email')}
            />
          </InputGroup>
          <FormErrorMessage textColor="white">
            <Text textColor="white">{errors.email?.message}</Text>
          </FormErrorMessage>
        </FormControl>
        <Box h="8"></Box>
        <FormControl id="password" isInvalid={Boolean(errors.password)}>
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
                onClick={handleShowPass}
                aria-label="Show Password"
                icon={
                  passwordVisible ? (
                    <AiOutlineEyeInvisible size="1.5em" color="white" />
                  ) : (
                    <AiOutlineEye size="1.5em" color="white" />
                  )
                }
                bgColor="transparent"
                h="1.75rem"
                size="sm"
                _hover={{
                  opacity: 0.7,
                }}
                _focus={{
                  outline: 'none',
                  boxShadow: 'none',
                }}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage textColor="white">
            <Text textColor="white">{errors.password?.message}</Text>
          </FormErrorMessage>
        </FormControl>
        <Box h="8"></Box>
        <Button
          w="full"
          isLoading={isSubmitting}
          type="submit"
          _hover={{ opacity: 0.7 }}
        >
          Sign In
        </Button>
      </form>
    </Container>
  );
};
