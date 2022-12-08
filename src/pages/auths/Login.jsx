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
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuths } from "@/hooks";
import { yupSchema, constant } from "@/utils";
import { Link } from "react-router-dom";

export const Login = () => {
  const ref = useRef(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(yupSchema.validationLogin()),
    defaultValues: constant.DEFAULTVALUES_LOGIN,
  });

  const { mutationLogin, isLoadingLogin } = useAuths();

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
      <form onSubmit={handleSubmit(mutationLogin)}>
        <Box bg="white" shadow="2xl" w="20rem" rounded="10px">
          <VStack px={5} py={6} gap={2}>
            <Text>Login</Text>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <FormControl isInvalid={errors.email}>
                  <Input
                    value={field.value}
                    ref={errors.email ? field.ref : ref}
                    type="email"
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
                    ref={errors.password}
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
            <ChakraLink as={Link} to="register">
              <Text>Belum Punya Akun ?</Text>
            </ChakraLink>
            <Button type="submit" isLoading={isLoadingLogin}>
              Submit
            </Button>
          </VStack>
        </Box>
      </form>
    </Container>
  );
};
