import { CloseIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Input, Select } from "@chakra-ui/react";
import React from "react";

interface FinancialInputProps {
  tableName: string;
}

const FinancialInput: React.FC<FinancialInputProps> = ({ tableName }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Flex flexDirection="column" alignItems="center" justifyContent="center">
        <h1>{tableName}</h1>
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
        <Flex>
          <Box flex="30%" p={1}>
            <Flex>
              <Input placeholder="Salary" />
            </Flex>
          </Box>
          <Box flex="30%" p={1}>
            <Flex>
              <Input placeholder="$100000" />
            </Flex>
          </Box>
          <Box flex="30%" p={1}>
            <Flex>
              <Select placeholder="Annually">
                <option value="option1">Semi-Annually</option>
                <option value="option2">Monthly</option>
                <option value="option3">Weekly</option>
                <option value="option3">Daily</option>
              </Select>
            </Flex>
          </Box>
          <Box className= "flex items-center" flex="10%" p={1}>
            <IconButton
              colorScheme="red"
              aria-label="Remove financial input"
              size='sm'
              icon={<CloseIcon />}
            />
          </Box>
        </Flex>
      </Flex>
    </div>
  );
};

export default FinancialInput;
