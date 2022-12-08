import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  FormControl,
  FormErrorMessage,
  Input,
  Container,
  VStack,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuths } from "@/hooks";
import { yupSchema, constant } from "@/utils";

export const Register = () => {
  const [errorsForm, setErrorsForm] = useState(false);
  const ref = useRef(null);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(yupSchema.validationRegister()),
    defaultValues: constant.DEFAULTVALUES_REGISTER,
  });

  const { mutationRegister, isLoadingRegister } = useAuths();

  const checkisError = Object.values(errors).find(
    (value) => value?.type === "required"
  );

  useEffect(() => {
    setErrorsForm(checkisError?.type === "required" ? true : false);
  }, [errorsForm, checkisError]);

  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <Container
      display="flex"
      justifyContent="center"
      alignItems="center"
      h="100vh"
    >
      <form onSubmit={handleSubmit(mutationRegister)}>
        <Box
          bg="white"
          shadow="2xl"
          w="20rem"
          rounded="10px"
          height={errorsForm ? "32rem" : "30rem"}
        >
          <VStack px={5} py={6} gap={2}>
            <Text>Registerr</Text>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <FormControl isInvalid={errors.firstName}>
                  <Input
                    value={field.value}
                    type="text"
                    ref={errors.firstName ? field.ref : ref}
                    onChange={(e) => field.onChange(e.target.value)}
                    placeholder="firstName"
                  />
                  <FormErrorMessage>
                    {errors.firstName && errors.firstName.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <FormControl isInvalid={errors.lastName}>
                  <Input
                    value={field.value}
                    type="text"
                    ref={field.ref}
                    onChange={(e) => field.onChange(e.target.value)}
                    placeholder="lastName"
                  />
                  <FormErrorMessage>
                    {errors.lastName && errors.lastName.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <FormControl isInvalid={errors.email}>
                  <Input
                    value={field.value}
                    type="email"
                    ref={field.ref}
                    onChange={(e) => field.onChange(e.target.value)}
                    placeholder="email"
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <FormControl isInvalid={errors.password}>
                  <Input
                    value={field.value}
                    ref={field.ref}
                    type="password"
                    onChange={(e) => field.onChange(e.target.value)}
                    placeholder="password"
                  />
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
            <Controller
              name="repeatPassword"
              control={control}
              render={({ field }) => (
                <FormControl isInvalid={errors.repeatPassword}>
                  <Input
                    value={field.value}
                    type="password"
                    ref={errors.repeatPassword}
                    onChange={(e) => field.onChange(e.target.value)}
                    placeholder="repeatPassword"
                  />
                  <FormErrorMessage>
                    {errors.repeatPassword && errors.repeatPassword.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
            <Button type="submit" isLoading={isLoadingRegister}>
              Submit
            </Button>
          </VStack>
        </Box>
      </form>
    </Container>
  );
};
