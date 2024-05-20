import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";

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
        $90,000 / year
      </Box>
    </Box>
  );
};

export default TotalExpense;
