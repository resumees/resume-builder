import React, { useState, useEffect } from "react";
import { Text, Input, Select, Button } from "@chakra-ui/react";
import Constants from "@/constants";
import {
  MortgageParams,
  addMortgageSearch,
  searchBoxParams,
} from "@/reduxFeatures/comparisonSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";

const MortgageSearchBox: React.FC = () => {
  const dispatch = useDispatch();
  const [mortgageParams, setMortgageParams] = useState<MortgageParams>(
    useSelector((state: RootState) => state.global.comparison.mortgage)
  );

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setMortgageParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(addMortgageSearch(mortgageParams));
  }, [mortgageParams]);

  return (
    <>
      <Text textAlign="left" p={1}>
        {Constants.MORTGAGE_SEARCHBOX.LOAN_AMOUNT.TITLE}
      </Text>
      <Input
        type="number"
        name="loanAmount"
        value={mortgageParams.loanAmount || ""}
        placeholder={Constants.MORTGAGE_SEARCHBOX.LOAN_AMOUNT.PLACEHOLDER}
        onChange={handleInputChange}
      />

      <Text textAlign="left" p={1}>
        {Constants.MORTGAGE_SEARCHBOX.LOAN_PURPOSE.TITLE}
      </Text>
      <Select
        name="loanPurpose"
        value={
          mortgageParams.loanPurpose ||
          Constants.MORTGAGE_SEARCHBOX.LOAN_PURPOSE.BUYING
        }
        onChange={handleInputChange}
      >
        <option value={Constants.MORTGAGE_SEARCHBOX.LOAN_PURPOSE.BUYING_NEXT_HOME}>
          {Constants.MORTGAGE_SEARCHBOX.LOAN_PURPOSE.BUYING}
        </option>
        <option value={Constants.MORTGAGE_SEARCHBOX.LOAN_PURPOSE.INVESTING}>
          {Constants.MORTGAGE_SEARCHBOX.LOAN_PURPOSE.INVESTING}
        </option>
        <option value={Constants.MORTGAGE_SEARCHBOX.LOAN_PURPOSE.REFINANCE}>
          {Constants.MORTGAGE_SEARCHBOX.LOAN_PURPOSE.REFINANCE}
        </option>
      </Select>

      <Text textAlign="left" p={1}>
        {Constants.MORTGAGE_SEARCHBOX.REPAYMENT_TYPE.TITLE}
      </Text>
      <Select
        name="repaymentType"
        value={
          mortgageParams.repaymentType ||
          Constants.MORTGAGE_SEARCHBOX.REPAYMENT_TYPE.PRINCIPAL
        }
        onChange={handleInputChange}
      >
        <option value={Constants.MORTGAGE_SEARCHBOX.REPAYMENT_TYPE.PRINCIPAL}>
          {Constants.MORTGAGE_SEARCHBOX.REPAYMENT_TYPE.PRINCIPAL}
        </option>
        <option value={Constants.MORTGAGE_SEARCHBOX.REPAYMENT_TYPE.INTEREST}>
          {Constants.MORTGAGE_SEARCHBOX.REPAYMENT_TYPE.INTEREST}
        </option>
      </Select>

      <Text textAlign="left" p={1}>
        {Constants.MORTGAGE_SEARCHBOX.INTEREST_RATE_TYPE.TITLE}
      </Text>
      <Select
        name="interestRateType"
        value={
          mortgageParams.interestRateType ||
          Constants.MORTGAGE_SEARCHBOX.INTEREST_RATE_TYPE.VARIABLE
        }
        onChange={handleInputChange}
      >
        <option
          value={Constants.MORTGAGE_SEARCHBOX.INTEREST_RATE_TYPE.VARIABLE}
        >
          {Constants.MORTGAGE_SEARCHBOX.INTEREST_RATE_TYPE.VARIABLE}
        </option>
        <option value={Constants.MORTGAGE_SEARCHBOX.INTEREST_RATE_TYPE.FIXED_1}>
          {Constants.MORTGAGE_SEARCHBOX.INTEREST_RATE_TYPE.FIXED_1}
        </option>
        <option value={Constants.MORTGAGE_SEARCHBOX.INTEREST_RATE_TYPE.FIXED_2}>
          {Constants.MORTGAGE_SEARCHBOX.INTEREST_RATE_TYPE.FIXED_2}
        </option>
        <option value={Constants.MORTGAGE_SEARCHBOX.INTEREST_RATE_TYPE.FIXED_3}>
          {Constants.MORTGAGE_SEARCHBOX.INTEREST_RATE_TYPE.FIXED_3}
        </option>
        <option value={Constants.MORTGAGE_SEARCHBOX.INTEREST_RATE_TYPE.FIXED_4}>
          {Constants.MORTGAGE_SEARCHBOX.INTEREST_RATE_TYPE.FIXED_4}
        </option>
        <option value={Constants.MORTGAGE_SEARCHBOX.INTEREST_RATE_TYPE.FIXED_5}>
          {Constants.MORTGAGE_SEARCHBOX.INTEREST_RATE_TYPE.FIXED_5}
        </option>
      </Select>
      <Button
        colorScheme="blue"
        p={2}
        mt="3"
        onClick={() => dispatch(searchBoxParams(true))}
      >
        Search
      </Button>
    </>
  );
};

export default MortgageSearchBox;
