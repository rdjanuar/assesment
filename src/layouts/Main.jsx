import React from "react";
import { Container, Flex, Stack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import { Sidebar } from "@/components";

export const MainLayout = () => {
  return (
    <Flex w="full" maxW="1920px" mx="auto" overflowY="auto" overflowX="hidden">
      <Sidebar />
      <Stack mx="7">
        <Outlet />
      </Stack>
    </Flex>
  );
};
