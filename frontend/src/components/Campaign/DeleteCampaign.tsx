import request from "@/util/api";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  CampaignPageProps,
  DELETE_CAMPAIGN_PLACEHOLDER,
} from "./Campaign.config";
import { useDispatch } from "react-redux";
import { deleteCampaign } from "@/reduxFeatures/campaignSlice";

const DeleteCampaign: React.FC<CampaignPageProps> = ({
  campaignId,
  campaignTitle,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [confirmTitle, setConfirmTitle] = useState("");
  const toast = useToast();
  const dispatch = useDispatch();

  const handleconfirmTitleChange = (e) => setConfirmTitle(e.target.value);

  const DeleteOverlay = () => (
    <ModalOverlay
      bg="rgba(255, 0, 0, 0.3)"
      backdropFilter="auto"
      backdropBlur="2px"
    />
  );

  const [overlay, setOverlay] = React.useState(<DeleteOverlay />);

  const handleConfirmDelete = async () => {
    confirmTitle === campaignTitle
      ? await request(
          `${import.meta.env.VITE_BACKEND_URL}/api/campaign/delete/${campaignId}`,
          "POST",
          {
            _id: campaignId
          }
        )
          .then((data) => {
            toast({
              title: `Campaign deleted`,
              description: `${campaignTitle} successfully deleted.`,
            });
            dispatch(deleteCampaign(data))
            onClose();
          })
          .catch((error) => {
            console.error("Delete campaign error:", error);
            toast({
              title: "Delete Campaign Error",
              description: `Error deleting campaign: ${error}`,
            });
          })
      : toast({
          title: "Incorrect Campaign Title",
          description: `${confirmTitle} does not match campaign title. Please enter campaign title, case sensitive.`,
        });
  };

  return (
    <Box>
      <Button
        colorScheme="red"
        onClick={onOpen}
      >
        Delete Campaign
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Delete {campaignTitle} Campaign</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Delete {campaignTitle}?</FormLabel>
              <Input
                placeholder={DELETE_CAMPAIGN_PLACEHOLDER}
                value={confirmTitle}
                onChange={handleconfirmTitleChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Flex alignItems="center" gap="2">
              <ButtonGroup gap="2" alignItems="end" alignSelf="end">
                <Button onClick={handleConfirmDelete} colorScheme="red">
                  Permanently Delete
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ButtonGroup>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DeleteCampaign;
