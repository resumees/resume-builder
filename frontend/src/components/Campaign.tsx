/* eslint-disable react/react-in-jsx-scope */
import { 
  Box, 
  Button, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  useDisclosure
} from "@chakra-ui/react";

const Campaign: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box>
      <Button colorScheme="blue" onClick={onOpen}>Create Campaign</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Campaign</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Campaign Title</FormLabel>
              <Input placeholder="Campaign Title" />
            </FormControl>
            <FormControl>
              <FormLabel>Position Description</FormLabel>
              <Textarea placeholder="Enter a position description including key selection criteria, experience, etc" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save Campaign
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Campaign;
