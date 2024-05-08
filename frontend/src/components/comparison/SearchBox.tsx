import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, Heading, Text, Input, Button, Flex } from "@chakra-ui/react";
import { addPostcode, addLoanAmountMortgage } from "@/reduxFeatures/comparisonSlice";
import Constants from "@/constants";

/**
 * Component: SearchBox.tsx
 * Parent: ProductComparison.tsx
 * Description: This acts as the search filter for financial products. For example, if a user
 *              is comparing homeloans, this component provides the search box to filter
 *              loan amount, borrowing purpose, fixed vs variable rates, etc. This component
 *              will render different inputs depending on the ProductType that renders it
 * Props:
 *   - ProductType: Obtained from constants folder, can be either gas/mortgage/electricity/phone
 */

type SearchBoxProps = {
  ProductType: string;
};

interface SearchParams {
  postcode?: string;
  loanAmount?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ ProductType }) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  const [postcodeError, setPostcodeError] = useState<string>("");

  // Instantiate the correct params depending on the ProductType
  useEffect(() => {
    if (ProductType === (Constants.TABLE_TYPE.ELECTRICITY || Constants.TABLE_TYPE.GAS)) {
      setSearchParams({
        postcode: ""
      })
    }
    if (ProductType === (Constants.TABLE_TYPE.MORTGAGE)) {
      setSearchParams({
        loanAmount: ""
      })
    }
  }, [ProductType])

  const handleUtilityInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prevSearchParams) => ({
      ...prevSearchParams,
      postcode: event.target.value,
    }));
  };

  const handleMortgageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prevSearchParams) => ({
      ...prevSearchParams,
      loanAmount: event.target.value,
    }));
  };  

  const handleSubmit = () => {
    if (ProductType === Constants.TABLE_TYPE.ELECTRICITY || ProductType === Constants.TABLE_TYPE.GAS) {
      if (!searchParams.postcode?.trim()) {
        setPostcodeError("Postcode cannot be empty");
        return;
      }
      setPostcodeError("");
      dispatch(addPostcode(searchParams));
    } else if (ProductType === Constants.TABLE_TYPE.MORTGAGE) {
      dispatch(addLoanAmountMortgage(searchParams));
    }
    
  };

  const ProductTypeParams = () => {
    if (ProductType === Constants.TABLE_TYPE.ELECTRICITY || ProductType === Constants.TABLE_TYPE.GAS) {
      return (
        <>
          <Text textAlign="left" p={1}>
            Postcode
          </Text>
          <Input
            placeholder="Enter your postcode"
            onChange={handleUtilityInputChange}
            value={searchParams?.postcode}
          />
          {postcodeError && <Text color="red">{postcodeError}</Text>}
        </>
      );
    } else if (ProductType === (Constants.TABLE_TYPE.MORTGAGE)) {
      return (
        <>
          <Text textAlign="left" p={1}>
            Loan amount
          </Text>
          <Input
            type="number"
            placeholder="Enter the loan amount"
            onChange={handleMortgageInputChange}
            value={searchParams?.postcode}
          />
          {postcodeError && <Text color="red">{postcodeError}</Text>}
        </>
      );
    } else return null
  };
  

  return (
    <Box display="flex" mt="2" flexDirection="column">
      <Heading as="h5" size="lg">
        Filter results
      </Heading>
      <Box
        bg="white"
        maxW="full"
        p={4}
        borderRadius="md"
        mt={4}
        border="1px solid #ccc"
      >
        {ProductTypeParams()}
        <Button
          colorScheme="blue"
          p={2}
          mt="3"
          onClick={handleSubmit}
          disabled={!searchParams?.postcode?.trim()}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default SearchBox;
