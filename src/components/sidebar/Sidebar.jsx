import React from "react";
import {
  Box,
  Text,
  Link as ChakraLink,
  chakra,
  Stack,
  Flex,
  Button,
} from "@chakra-ui/react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

import { constant, helper } from "@/utils";

export const Sidebar = () => {
  const navigate = useNavigate();
  const handlerLogout = () => {
    helper.logout(() => navigate("/"));
  };
  return (
    <Box
      w="200px"
      bg="blue.100"
      transition="width 0.3s ease"
      h="100vh"
      py={6}
      px={4}
      overflowX="hidden"
      alignItems="center"
      justifyContent="center"
      overflowY="auto"
    >
      <chakra.ul mt="6">
        {constant.MENU_DASHBOARD.map((p) => (
          <ChakraLink
            as={NavLink}
            to={p.link}
            key={p.name}
            _hover={{ textDecoration: "none" }}
          >
            {({ isActive }) => (
              <Text
                fontSize="bodyBase"
                fontWeight="medium"
                color="base.primary.500"
                lineHeight="16.94px"
                mt={2}
                bg={isActive ? "rgba(4, 83, 239, 0.1)" : ""}
                py={3.5}
                pl={4}
                w="200px"
                roundedRight="5px"
                pos="relative"
                left={-4}
              >
                {p.name}
              </Text>
            )}
          </ChakraLink>
        ))}
        <Button onClick={handlerLogout}>Logout</Button>
      </chakra.ul>
    </Box>
  );
};
