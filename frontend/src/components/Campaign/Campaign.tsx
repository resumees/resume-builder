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
import { CAMPAIGN_DESCRIPTION_PLACEHOLDER, CAMPAIGN_TITLE_PLACEHOLDER, TEST_APPLICANT_DATA } from "./Campaign.config";
import { CampaignTable } from "./CampaignTable";
import React from "react";

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
              <Input placeholder={CAMPAIGN_TITLE_PLACEHOLDER} />
            </FormControl>
            <FormControl>
              <FormLabel>Position Description</FormLabel>
              <Textarea placeholder={CAMPAIGN_DESCRIPTION_PLACEHOLDER} />
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
