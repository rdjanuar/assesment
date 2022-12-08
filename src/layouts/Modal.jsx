import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Container,
} from "@chakra-ui/react";

export const LayoutModal = ({
  children,
  tittle,
  isOpen,
  onClose,
  size,
  mx,
  scrollBehavior,
}) => {
  return (
    <Container maxW="container.sm">
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={size}
        scrollBehavior={scrollBehavior}
      >
        <ModalOverlay />

        <ModalContent rounded="base" overflowY="auto">
          <ModalHeader
            color="base.secondary"
            fontSize="bodyLarge"
            fontWeight="bold"
            mt="5"
            mx={!mx ? "" : mx}
          >
            {tittle}
          </ModalHeader>

          <ModalCloseButton color="functional.warning" />
          <ModalBody pb={10}>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};
