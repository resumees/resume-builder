import React from "react";
import FinancialInput from "../components/FinancialInput";

const Finances: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <FinancialInput tableName="Income" />
      <FinancialInput tableName="Expenses" />
    </div>
  );
};

export default Finances;
