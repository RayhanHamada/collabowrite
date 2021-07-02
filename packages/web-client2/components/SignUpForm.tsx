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
import { useRouter } from 'next/router';
import { MouseEventHandler, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLock,
  AiOutlineMail,
} from 'react-icons/ai';
import * as yup from 'yup';

type FormFieldValue = {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

const formFieldSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email().required('Email required'),
  password: yup.string().min(8).required('Password required'),
  passwordConfirmation: yup
    .string()
    .min(8)
    .required('Password Confirmation required'),
});

export const SignUpForm: React.FC = () => {
  const router = useRouter();

  const navigateToSignIn: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    router.replace('/signin');
  };

  const [passwordVisible, togglePasswordVisible] = useState(false);

  const {
    formState: { errors, isValid, isSubmitting },
    register,
    handleSubmit,
    setError,
  } = useForm<FormFieldValue>({
    resolver: yupResolver(formFieldSchema),
  });

  const onSubmit = handleSubmit(
    async (data) => {
      console.log(`isvalid ${isValid}`);
      console.log(
        `${data.username} ${data.email} ${data.password} ${data.passwordConfirmation}`
      );

      if (data.password !== data.passwordConfirmation) {
        setError('passwordConfirmation', {
          message: 'password confirmation not match with password !',
        });
        return;
      }
    },
    (errors) => {
      console.log(`isvalid ${isValid}`);
      console.log(errors);
    }
  );

  const handleShowPass: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    togglePasswordVisible((s) => !s);
  };

  return (
    <Container
      paddingX="16"
      paddingY="8"
      marginTop="8"
      border="1px"
      rounded="2xl"
      justifyContent="space-between"
      borderRight="8px"
      borderTop="8px"
      borderColor="white"
    >
      <Text textColor="white" fontSize="3xl">
        Sign Up
      </Text>
      <form onSubmit={onSubmit}>
        <FormControl id="username" isInvalid={Boolean(errors.username)}>
          <FormLabel textColor="white">Username</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <AiOutlineMail color="white" />
            </InputLeftElement>
            <Input
              type="text"
              textColor="white"
              placeholder="myAwesomeUsername"
              borderTop="4px"
              borderRight="4px"
              _placeholder={{ opacity: 0.7 }}
              {...register('username')}
            />
          </InputGroup>
          <FormErrorMessage textColor="red">
            {errors.username?.message}
          </FormErrorMessage>
        </FormControl>
        <Box h="8"></Box>
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
          <FormErrorMessage textColor="red">
            {errors.email?.message}
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
          <FormErrorMessage textColor="red">
            {errors.password?.message}
          </FormErrorMessage>
        </FormControl>
        <Box h="8"></Box>
        <FormControl
          id="passwordConfirmation"
          isInvalid={Boolean(errors.passwordConfirmation)}
        >
          <FormLabel textColor="white">Password Confirmation</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <AiOutlineLock color="white" />
            </InputLeftElement>
            <Input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Must be the same as above"
              _placeholder={{ opacity: 0.6 }}
              textColor="white"
              borderTop="4px"
              borderRight="4px"
              {...register('passwordConfirmation')}
            />
            <InputRightElement>
              <IconButton
                onClick={handleShowPass}
                aria-label="Show Password Confirmation"
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
          <FormErrorMessage textColor="red">
            {errors.passwordConfirmation?.message}
          </FormErrorMessage>
        </FormControl>
        <Box h="8"></Box>
        <Button
          w="full"
          isLoading={isSubmitting}
          type="submit"
          _hover={{ opacity: 0.7 }}
          //   disabled={!isValid}
        >
          Sign Up
        </Button>
      </form>
      <Box h="4"></Box>
      <Button
        variant="link"
        _hover={{ textDecoration: 'underline' }}
        onClick={navigateToSignIn}
      >
        Already have an account ?
      </Button>
    </Container>
  );
};
