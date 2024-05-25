import React, { useState, useEffect } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { parseCurrency } from "@/util/common";
import Constants from "@/constants";

/**
 * Component: TotalExpense.tsx
 * Parent: ProductComparison.tsx
 * Description: Shows the user the total expenses they currently possess, and any projected
 *              expenses based on the financial products they have selected
 * Props:
 *   -
 */

const TotalExpense: React.FC = ({}) => {
  const totalExpense = useSelector(
    (state: RootState) => state.global.financials.totalExpense
  );

  const selectedMortgage = useSelector((state: RootState) => {
    const mortgage = state.global.comparison.mortgage.selectedMortgage;
    const frequency = state.global.financials.expenses.find((obj) => {
      return obj.category === Constants.TABLE_TYPE.MORTGAGE;
    })?.frequency;
    return [mortgage?.monthlyRepayment, frequency ? frequency : 0] || null;
  });

  const selectedPhone = useSelector((state: RootState) => {
    const phone = state.global.comparison.phone.selectedPhone;
    const frequency = state.global.financials.expenses.find((obj) => {
      return obj.category === Constants.TABLE_TYPE.PHONE;
    })?.frequency;
    
    if (phone && phone.data && phone.data.length > 4) {
      return [phone.data[4].value, frequency ? frequency : 0];
    } else {
      return [null, frequency ? frequency : 0];
    }
  });
  
  

  const selectedElectricity = useSelector((state: RootState) => {
    const electricity = state.global.comparison.electricity.selectedElectricity;
    const frequency = state.global.financials.expenses.find((obj) => {
      return obj.category === Constants.TABLE_TYPE.PHONE;
    })?.frequency;
    return [electricity?.estimatedCost, frequency ? frequency : 0] || null;
  });

  const currentElectricity = useSelector((state: RootState) => {
    const electricityExpense = state.global.financials.expenses.find(
      (item: { category: string }) =>
        item.category === Constants.TABLE_TYPE.ELECTRICITY
    );

    return electricityExpense?.amount ?? null;
  });
  const currentMortgage = useSelector((state: RootState) => {
    const mortgageExpense = state.global.financials.expenses.find(
      (item: { category: string }) =>
        item.category === Constants.TABLE_TYPE.MORTGAGE
    );

    return mortgageExpense?.amount ?? null;
  });

  const currentPhone = useSelector((state: RootState) => {
    const phoneExpense = state.global.financials.expenses.find(
      (item: { category: string }) =>
        item.category === Constants.TABLE_TYPE.PHONE
    );

    return phoneExpense?.amount ?? null;
  });

  const diffElectricity =
    selectedElectricity !== null && selectedElectricity[0] !== 0
      ? (parseCurrency(currentElectricity) -
          parseCurrency(selectedElectricity[0]))
      : 0;

  const diffMortgage =
    selectedMortgage !== null && selectedMortgage[0] !== 0
      ? (parseCurrency(currentMortgage) - parseCurrency(selectedMortgage[0])) *
        Constants.FREQUENCY_MONTHLY
      : 0;

  const diffPhone =
    selectedPhone !== null && selectedPhone[0] !== 0
      ? (parseCurrency(currentPhone) - parseCurrency(selectedPhone[0])) *
        Constants.FREQUENCY_MONTHLY
      : 0;

  return (
    <Box display="flex" mt="2" flexDirection="column">
      <Box
        bg="white"
        maxW="full"
        p={4}
        borderRadius="md"
        mt={4}
        border="1px solid #ccc"
      >
        <Heading as="h5" size="lg">
          Existing Expenses
        </Heading>
        ${totalExpense} / year
      </Box>
      <Box
        bg="white"
        maxW="full"
        p={4}
        borderRadius="md"
        mt={4}
        border="1px solid #ccc"
      >
        <Heading as="h5" size="lg">
          Potential Expenses
        </Heading>
        <Text>
          {" "}
          Mortgage: {parseCurrency(selectedMortgage[0]) != 0 ? -diffMortgage : 0}
        </Text>
        <Text>
          {" "}
          Phone: {parseCurrency(selectedPhone[0]) != 0 ? -diffPhone : 0}
        </Text>
        <Text>
          {" "}
          Electricity:{" "}
          {parseCurrency(selectedElectricity[0]) != 0 ? -diffElectricity : 0}
        </Text>
        <Text> Gas: TO DO</Text>
        <Text>
          ${totalExpense - diffMortgage - diffPhone - diffElectricity} / year
        </Text>
      </Box>
    </Box>
  );
};

export default TotalExpense;
