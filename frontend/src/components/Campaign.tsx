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
<<<<<<< Updated upstream:frontend/src/components/Campaign.tsx
=======
import { CAMPAIGN_DESCRIPTION_PLACEHOLDER, CAMPAIGN_TITLE_PLACEHOLDER, TEST_APPLICANT_DATA } from "./Campaign.config";
import { CampaignTable } from "./CampaignTable";
>>>>>>> Stashed changes:frontend/src/components/Campaign/Campaign.tsx

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
      <CampaignTable campaignName={"Test"} tableData={TEST_APPLICANT_DATA} />
    </Box>
  );
};

export default Campaign;
