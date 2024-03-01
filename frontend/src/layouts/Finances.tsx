import React from "react";
import FinancialInput from "../components/FinancialInput";
import Sankey from "../components/Sankey";
import Constants from "../constants";
import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { saveToLocalStorage } from "../reduxFeatures/finances/financesSlice";
import { useSelector } from 'react-redux';
import request from "../util/api";
import { RootState } from "../store";

const Finances: React.FC = () => {
  const dispatch = useDispatch();
  const financialsReduxState = useSelector((state: RootState) => state.financials);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  const handleSaveButtonClick = () => {
    dispatch(saveToLocalStorage());
    request('http://localhost:4000/uploadFinancials', 'POST', { data: financialsReduxState })
    .then((data: any) => console.log(data));
    onOpen(); 
  }

  return (
    <div className="w-full flex h-screen p-4">
      <div className="w-1/2 flex flex-row justify-center items-center">
        <FinancialInput tableName={Constants.TYPE_INCOME} />
        <FinancialInput tableName={Constants.TYPE_EXPENSE} />
      </div>
      <div className="w-1/2 flex flex-col items-end">
        <Flex direction="row" align="center" justify="center">
          <p className="mr-4">Testing</p>
          <Button
            colorScheme="whatsapp"
            onClick={() => handleSaveButtonClick()}
          >
            Save
          </Button>
          <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody>
                You have saved your current data
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
        <Sankey />
      </div>
    </div>
  );
};

export default Finances;
