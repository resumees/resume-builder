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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  CAMPAIGN_DESCRIPTION_PLACEHOLDER,
  CAMPAIGN_TITLE_PLACEHOLDER,
} from "./Campaign.config";
import React, { useState } from "react";
import { addCampaign } from "@/reduxFeatures/campaignSlice";
import { useDispatch } from "react-redux";
import request from "@/util/api";

const CreateCampaign: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [campaignTitle, setCampaignTitle] = useState("");
  const [campaignDescription, setCampaignDescription] = useState("");
  const dispatch = useDispatch();
  const toast = useToast();

  const handleCampaignTitleChange = (e) => setCampaignTitle(e.target.value);
  const handleCampaignDescriptionChange = (e) => {
    setCampaignDescription(e.target.value);
  };

  const handleSubmit = async () => {
    const data = await request(
      `${import.meta.env.VITE_BACKEND_URL}/api/campaign/new`,
      "POST",
      {
        documentName: campaignTitle,
        documentDescription: campaignDescription,
      }
    ).then((data) => {
      dispatch(
        addCampaign({
          _id: data.savedCampaignId,
          documentName: campaignTitle,
          documentDescription: campaignDescription,
          applicant: [],
        })
      );
    }).then(() => {
      toast({
        title: `Campaign Saved`,
        description: `${campaignTitle} saved to database.`,
      });
    })
    .then(() => {
      onClose();
    })
    .catch((error) => {
      console.error("Save campaign error:", error);
      toast({
        title: `Save Campaign Error`,
        description: `Error saving to database: ${error}`,
      });
    });

  };

  return (
    <Box>
      <Button colorScheme="blue" onClick={onOpen}>
        Create Campaign
      </Button>

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
