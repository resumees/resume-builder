import React, { useEffect, useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import request from "../../util/api";
import SortedTable from "../ui/SortedTable";
import { useLocation } from "react-router-dom";

interface ExpenseItem {
  id: string;
  category: string;
  amount: number;
  frequency: number;
}

const Internet: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pageNumber = parseInt(params.get('pageNumber') || '1', 10);
  const pageSize = 5;

  useEffect(() => {
    console.log(pageNumber);
  }, [pageNumber])
  
  const { expenses } = useSelector(
    (state: RootState) => state.global.financials
  );
  const telephoneFinances = expenses.find(
    (item: ExpenseItem) => item.category === "Telephone"
  );

  const [phoneData, setPhoneData] = useState();

  // Fetch phone data from backend
  useEffect(() => {
    request(`${import.meta.env.VITE_BACKEND_URL}/financials/phone?page=${pageNumber}&pageSize=${pageSize}`, "GET").then(
      (res: any) => {
        console.log(res.data);
        setPhoneData(res.data);
      }
    );
  }, [pageNumber]);

  return (
    <Box display="flex" p={7} flexDirection="row" width="100%">
      <Box display="flex" p={7} flexDirection="column">
        <Heading as="h5" size="lg">
          Overview
        </Heading>
        <Box bg="white" p={4} borderRadius="md" mt={4} border="1px solid #ccc">
          <Text>
            Your current telephone bill: $
            {(
              (telephoneFinances?.amount * telephoneFinances?.frequency) /
              12
            ).toFixed(2)}{" "}
            / month
          </Text>
        </Box>
      </Box>
      <Box display="flex" p={7} flexDirection="column" flex="1">
        <Heading as="h5" size="lg">
          Available plans
        </Heading>
        <Box bg="white" p={4} borderRadius="md" mt={4} border="1px solid #ccc">
          <SortedTable tableData={phoneData}/>
        </Box>
      </Box>
    </Box>
  );
};

export default Internet;
