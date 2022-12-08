/* eslint-disable array-callback-return */
import React, { useEffect, useMemo } from "react";
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";

import { useUsers } from "@/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { yupSchema } from "@/utils";

export const User = () => {
  const { data, isLoading, handlerSubmit, loading, isSuccess } = useUsers();

  const defaultValues = useMemo(
    () => ({
      firstName: isSuccess && data?.firstName,
      lastName: isSuccess && data?.lastName,
      email: isSuccess && data?.email,
      oldPassword: "",
      newPassword: "",
      repeatPassword: "",
    }),
    [data, isSuccess]
  );

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(yupSchema.validationUser()),
  });

  useEffect(() => {
    Object.keys(defaultValues).forEach((user) => {
      setValue(user, defaultValues[user]);
    });
  }, [data, defaultValues, setValue]);

  if (isLoading) {
    return <div>Loadingg</div>;
  }

  return (
    <Container mt={4}>
      <Text>User Profile</Text>
      <form onSubmit={handleSubmit(handlerSubmit)}>
        <VStack align="start">
          <Controller
            control={control}
            name="firstName"
            render={({ field }) => (
              <FormControl isInvalid={errors.firstName}>
                <Input
                  ref={field.ref}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
                <FormErrorMessage>
                  {errors.firstName && errors.firstName.message}
                </FormErrorMessage>
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="lastName"
            render={({ field }) => (
              <FormControl isInvalid={errors.lastName}>
                <Input
                  ref={field.ref}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
                <FormErrorMessage>
                  {errors.lastName && errors.lastName.message}
                </FormErrorMessage>
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl isInvalid={errors.email}>
                <Input
                  ref={field.ref}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="oldPassword"
            render={({ field }) => (
              <FormControl isInvalid={errors.oldPassword}>
                <Input
                  ref={field.ref}
                  type="password"
                  placeholder="Old Password"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
                <FormErrorMessage>
                  {errors.oldPassword && errors.oldPassword.message}
                </FormErrorMessage>
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="newPassword"
            render={({ field }) => (
              <FormControl isInvalid={errors.newPassword}>
                <Input
                  placeholder="New Password"
                  type="password"
                  ref={field.ref}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
                <FormErrorMessage>
                  {errors.newPassword && errors.newPassword.message}
                </FormErrorMessage>
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="repeatPassword"
            render={({ field }) => (
              <FormControl isInvalid={errors.repeatPassword}>
                <Input
                  type="password"
                  placeholder="Repeat Password"
                  value={field.value}
                  ref={field.ref}
                  onChange={(e) => field.onChange(e.target.value)}
                />
                <FormErrorMessage>
                  {errors.repeatPassword && errors.repeatPassword.message}
                </FormErrorMessage>
              </FormControl>
            )}
          />
          <Button type="submit" isLoading={loading}>
            Save
          </Button>
        </VStack>
      </form>
    </Container>
  );
};
