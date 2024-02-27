import { CloseIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Input, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { financesSlice } from "../reduxFeatures/finances/financesSlice";

interface FinancialInputItemProps {
  itemKey: number;
  type: string;
  category: string;
  amount: number;
  frequency: string;
}

const FinancialInputItem: React.FC<FinancialInputItemProps> = ({
  itemKey,
  type,
  category,
  amount,
  frequency
}) => {
  const dispatch = useDispatch();
  
  const [item, setItem] = useState({
    category: category,
    amount: amount,
    frequency: frequency,
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newItem = { ...item };
    switch (e.target.name) {
      case "category":
        newItem = { ...item, category: e.target.value };
        break;
      case "amount":
        newItem = { ...item, amount: parseFloat(e.target.value) };
        break;
      case "frequency":
        newItem = { ...item, frequency: e.target.value };
        break;
    }
    setItem(newItem);
    dispatch(financesSlice.actions.editInput({ itemKey, type, item: newItem }));
  };

  const onItemDelete = () => {
    console.log("Deleting item", itemKey);
    dispatch(financesSlice.actions.removeInput({ itemKey, type }));
  }

  return (
    <Flex>
      <Box flex="30%" p={1}>
        <Flex>
          <Input
            name="category"
            onBlur={handleFormChange}
            placeholder="Salary"
            defaultValue={item.category}
          />
        </Flex>
      </Box>
      <Box flex="30%" p={1}>
        <Flex>
          <Input
            name="amount"
            onBlur={handleFormChange}
            placeholder="$100000"
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
                alert('You can only use numbers');
              }
            }}
            defaultValue={item.amount}
          />
        </Flex>
      </Box>
      <Box flex="30%" p={1}>
        <Flex>
          <Select
            name="frequency"
            onBlur={handleFormChange}
            placeholder="Annually"
            defaultValue={item.frequency}
          >
            <option value="annual">Semi-Annually</option>
            <option value="month">Monthly</option>
            <option value="week">Weekly</option>
            <option value="daily">Daily</option>
          </Select>
        </Flex>
      </Box>
      <Box className="flex items-center" flex="10%" p={1}>
        <IconButton
          colorScheme="red"
          aria-label="Remove financial input"
          size="sm"
          onClick={onItemDelete}
          icon={<CloseIcon />}
        />
      </Box>
    </Flex>
  );
};

export default FinancialInputItem;
