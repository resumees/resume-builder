import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import Constants from "@/constants";
import MortgageSearchBox from "./MortgageSearchBox";
import UtilitySearchBox from "./UtilitySearchBox";
import PhoneSearchBox from "./PhoneSearchBox";

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

const SearchBox: React.FC<SearchBoxProps> = ({ ProductType }) => {
  // Depending on the ProductType, the filter results will show different inputs.
  // E.g. mortgage will have inputs for loan amount and utilities will have inputs
  // for postcode
  const ProductTypeParams = () => {
    if (
      ProductType === Constants.TABLE_TYPE.ELECTRICITY ||
      ProductType === Constants.TABLE_TYPE.GAS
    ) {
      return (
        <UtilitySearchBox />
      );
    } 
    if (ProductType === Constants.TABLE_TYPE.MORTGAGE) {
      return <MortgageSearchBox />;
    } 
    if (ProductType === Constants.TABLE_TYPE.PHONE) {
      return <PhoneSearchBox />;
    } 
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
      </Box>
    </Box>
  );
};

export default SearchBox;
