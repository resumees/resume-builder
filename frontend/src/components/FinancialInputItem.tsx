import { CloseIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Input, Select } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { financesSlice } from "../reduxFeatures/finances/financesSlice";

interface FinancialInputItemProps {
  id: string;
  type: string;
  category: string;
  amount: number;
  frequency: string;
}

const FinancialInputItem: React.FC<FinancialInputItemProps> = ({
  id,
  type,
  category,
  amount,
  frequency
}) => {
  const dispatch = useDispatch();
  
  const [item, setItem] = useState({
    id: id,
    category: category,
    amount: amount,
    frequency: frequency,
  });

  useEffect(() => {
    setItem({
      id: id,
      category: category,
      amount: amount,
      frequency: frequency,
    });
  }, [id, category, amount, frequency]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newItem = { ...item };
    switch (e.target.name) {
      case "category":
        newItem = { ...item, category: e.target.value };
        break;
      case "amount":
        newItem = { ...item, amount: e.target.value ? parseFloat(e.target.value) : 0 };
        break;
      case "frequency":
        newItem = { ...item, frequency: e.target.value };
        break;
    }
    setItem(newItem);
    dispatch(financesSlice.actions.editInput({ id: item.id, type, item: newItem }));
  };

  const onItemDelete = () => {

    dispatch(financesSlice.actions.removeInput({ id: item.id, type }));
  }

  return (
    <Flex>
      <Box flex="30%" p={1}>
        <Flex>
          <Input
            name="category"
            onChange={handleFormChange}
            placeholder="Salary"
            value={item.category}
          />
        </Flex>
      </Box>
      <Box flex="30%" p={1}>
        <Flex>
          <Input
            name="amount"
            onChange={handleFormChange}
            placeholder="$100000"
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
                alert('You can only use numbers');
              }
            }}
            value={item.amount}
          />
        </Flex>
      </Box>
      <Box flex="30%" p={1}>
        <Flex>
          <Select
            name="frequency"
            onChange={handleFormChange}
            placeholder="Annually"
            value={item.frequency}
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
