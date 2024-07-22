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
import { CAMPAIGN_DESCRIPTION_PLACEHOLDER, CAMPAIGN_TITLE_PLACEHOLDER } from "./Campaign.config";
import React, { useState } from "react";
import request from "@/util/api";
import { addCampaign } from "@/reduxFeatures/campaignSlice";
import { useDispatch } from "react-redux";
        
const CreateCampaign: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [campaignTitle, setCampaignTitle] = useState("");
  const [campaignDescription, setCampaignDescription] = useState("");
  const dispatch = useDispatch();

  const handleCampaignTitleChange = (e) => setCampaignTitle(e.target.value);
  const handleCampaignDescriptionChange = (e) => setCampaignDescription(e.target.value);

  const handleSubmit = () => {
    const newCampaign = {
      documentName: campaignTitle,
      documentDescription: campaignDescription,
    }
    request(`${import.meta.env.VITE_BACKEND_URL}/api/campaign/new`, "POST", newCampaign)
      .then(() => {
        dispatch(addCampaign({
          _id: "",
          documentName: campaignTitle,
          documentDescription: campaignDescription,
        }));
      })
      .then(() => {
        onClose();
      });
  };

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
              <Input 
              placeholder={CAMPAIGN_TITLE_PLACEHOLDER}
              value={campaignTitle}
              onChange={handleCampaignTitleChange} 
              />
            </FormControl>
            <FormControl>
              <FormLabel>Position Description</FormLabel>
              <Textarea 
              placeholder={CAMPAIGN_DESCRIPTION_PLACEHOLDER}
              value={campaignDescription}
              onChange={handleCampaignDescriptionChange} 
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save Campaign
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CreateCampaign;
