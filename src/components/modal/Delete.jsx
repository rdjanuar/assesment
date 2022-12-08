import { Heading, Text, Button, Flex, HStack, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { LayoutModal } from "@/layouts/Modal";
import { ActionContext } from "@/context/Action";

export const ModalDelete = ({ confirmModal, isLoading }) => {
  const { toggleDelete } = useContext(ActionContext);

  return (
    <LayoutModal isOpen={toggleDelete} size="sm" onClose={toggleDelete}>
      <Flex direction={"column"}>
        <VStack spacing={4}>
          <Heading
            fontSize={"heading"}
            fontWeight={"bold"}
            textAlign={"center"}
          >
            Anda Yakin ?
          </Heading>
          <Text
            fontSize={"bodyBase"}
            fontWeight={"medium"}
            textAlign={"center"}
          >
            Hati - hati, data tidak bisa dikembalikan...
          </Text>
        </VStack>
        <HStack justify="center">
          <Button
            onClick={() => confirmModal()}
            isLoading={isLoading}
            _hover={{
              bg: "#A34343",
            }}
          >
            Hapus
          </Button>
          <Button onClick={toggleDelete}>Batal</Button>
        </HStack>
      </Flex>
    </LayoutModal>
  );
};
