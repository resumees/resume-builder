import React, { useEffect } from "react";
import FinancialInput from "../components/FinancialInput";
import Sankey from "../components/Sankey";
import Constants from "../constants";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { saveToLocalStorage, setFinancialsState } from "../reduxFeatures/financesSlice";
import { useSelector } from "react-redux";
import request from "../util/api";
import { RootState } from "../store";

const Finances: React.FC = () => {
  const dispatch = useDispatch();
  const { financials, authentication } = useSelector(
    (state: RootState) => ({
      financials: state.global.financials,
      authentication: state.global.authentication
    })
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  useEffect(() => {
    if (authentication.isAuthenticated && !localStorage.getItem('financials')) {
      request(`${import.meta.env.VITE_BACKEND_URL}/financials/getFinancials`, "GET").then((res: any) => {
        dispatch({ type: "global/setFinancialsState", payload: res.data });
        dispatch(setFinancialsState(res.data));
      });
    }
  }, [authentication.isAuthenticated]);

  const handleSaveButtonClick = () => {
    dispatch(saveToLocalStorage());
    request(`${import.meta.env.VITE_BACKEND_URL}/uploadFinancials`, "POST", {
      data: financials,
    });
    onOpen();
  };

  return (
    <div className="w-full flex h-screen p-4">
      <div className="w-1/2 flex flex-row justify-center items-center">
        <FinancialInput tableName={Constants.TYPE_INCOME} />
        <FinancialInput tableName={Constants.TYPE_EXPENSE} />
      </div>
      <div className="w-1/2 flex flex-col items-end">
        <Flex direction="row" align="center" justify="center">
          <Button
            colorScheme='messenger'
            size="sm"
            onClick={() => handleSaveButtonClick()}
          >
            Save@@@@@
          </Button>
          <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody>You have saved your current data</ModalBody>
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
