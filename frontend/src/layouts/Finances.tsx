import React from "react";
import FinancialInput from "../components/FinancialInput";
import Sankey from "../components/Sankey";

const Finances: React.FC = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-row justify-center items-center">
        <FinancialInput tableName="Income" />
        <FinancialInput tableName="Expenses" />
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <Sankey />
      </div>
    </div>
  );
};

export default Finances;