import React from "react";
import { Flex, Stack, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import { Sidebar } from "@/components";

export const MainLayout = () => (
  <Container maxW="1920px" p={0}>
    <Flex h="100vh">
      <Sidebar />
      <Flex
        direction="column"
        w="full"
        maxW="1920px"
        mx="auto"
        overflowY="auto"
        overflowX="hidden"
      >
        <Stack mx="7">
          <Outlet />
        </Stack>
      </Flex>
    </Flex>
  </Container>
);
