import { Box, Flex, Input } from "@chakra-ui/react";
import React from "react";

interface FinancialInputProps {
  tableName: string;
}

const FinancialInput: React.FC<FinancialInputProps> = ({ tableName }) => {
  return (
    <div className="flex justify-center items-center h-screen">
        <h1>{tableName}</h1>
        <Flex border="1px solid black">
        <Box flex="30%" p={4}>
          Category
          <Flex>
            <Input placeholder="Basic usage" />
          </Flex>
        </Box>
        <Box flex="40%" p={4}>
          Amount
          <Flex>
            <Input placeholder="Basic usage" />
          </Flex>
        </Box>
        <Box flex="20%" p={4}>
          Frequency
          <Flex>
            <Input placeholder="Basic usage" />
          </Flex>
        </Box>
        <Box flex="10%" p={4}>
        </Box>
      </Flex>
    </div>
  );
};

export default FinancialInput;