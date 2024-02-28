import { Box, Button, Flex } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { addIncome, addExpense } from "../reduxFeatures/finances/financesSlice";
import React, { useState, useEffect } from "react";
import FinancialInputItem from "./FinancialInputItem";
import { RootState } from "../store";
import Constants from "../constants";

interface FinancialInputProps {
  tableName: string;
}

interface FinanceInput {
  id: string
  category: string;
  amount: number;
  frequency: string;
}

const FinancialInput: React.FC<FinancialInputProps> = ({ tableName }) => {
  const dispatch = useDispatch();
  const income = useSelector((state: RootState) => state.financials.income);
  const expenses = useSelector((state: RootState) => state.financials.expenses);
  const [financeArray, setFinanceArray] = useState<FinanceInput[]>(
    tableName === Constants.TYPE_INCOME ? income : expenses
  );

  useEffect(() => {
    setFinanceArray(tableName === Constants.TYPE_INCOME ? income : expenses);
  }, [income, expenses]);

  const handleAddInput = () => {
    if (tableName === Constants.TYPE_INCOME) {
      dispatch(addIncome());
    } else if (tableName === Constants.TYPE_EXPENSE) {
      dispatch(addExpense());
    }
  };

  return (
    <div className="w-full flex justify-center items-start h-screen rounded-lg border border-gray-300">
      <Flex width="100%" flexDirection="column" alignItems="center" justifyContent="center">
        <h2 className="text-4xl font-extrabold dark:text-white pb-4">
          {tableName}
        </h2>
        <Flex className="w-full">
          <Box flex="30%" p={1}>
            Category
          </Box>
          <Box flex="30%" p={1}>
            Amount ($)
          </Box>
          <Box flex="30%" p={1}>
            Frequency
          </Box>
          <Box flex="10%" p={1}></Box>
        </Flex>
        {financeArray.map((item, index) => (
          <FinancialInputItem
            key={index}
            type={tableName}
            id={item.id}
            category={item.category}
            amount={item.amount}
            frequency={item.frequency}
          />
        ))}
        <Button
          colorScheme="teal"
          variant="outline"
          mt={3}
          onClick={handleAddInput}
        >
          Add a new {tableName} input
        </Button>
      </Flex>
    </div>
  );
};

export default FinancialInput;
