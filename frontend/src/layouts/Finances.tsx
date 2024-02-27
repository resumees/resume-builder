import React from "react";
import FinancialInput from "../components/FinancialInput";
import Sankey from "../components/Sankey";
import Constants from "../constants";
import { Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { saveToLocalStorage } from "../reduxFeatures/finances/financesSlice";

const Finances: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="w-full flex h-screen">
      <div className="w-1/2 flex flex-row justify-center items-center">
        <FinancialInput tableName={Constants.TYPE_INCOME} />
        <FinancialInput tableName={Constants.TYPE_EXPENSE} />
      </div>
      <div className="w-1/2 flex flex-col items-end">
        <Button
          colorScheme="whatsapp"
          onClick={() => dispatch(saveToLocalStorage())}
        >
          Save
        </Button>
        <Sankey />
      </div>
    </div>
  );
};

export default Finances;
