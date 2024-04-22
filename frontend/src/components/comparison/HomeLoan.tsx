import React, { useEffect, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ExpenseItem } from "./Phone";
import SortedTable from "../ui/SortedTable";
import request from "@/util/api";
import { useLocation } from "react-router-dom";
import ProductOverview from "./ProductOverview";
import Constants from "@/constants";

const HomeLoan: React.FC = () => {
  const mortgageFinances = useSelector((state: RootState) =>
    state.global.financials.expenses.find(
      (item: ExpenseItem) => item.category === "Mortgage"
    )
  );
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pageNumber = parseInt(params.get("pageNumber") || "1", 10);
  const pageSize = 5;

  const [mortgageData, setMortgageData] = useState([]);
  const [mortgageDataLength, setMortgageDataLength] = useState(0);

  useEffect(() => {
    request(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/financials/mortgage?page=${pageNumber}&pageSize=${pageSize}`,
      "GET"
    ).then((res: any) => {
      console.log(res.data);
      setMortgageData(res.data.productData);
      setMortgageDataLength(res.data.productDataLength);
    });
  }, [pageNumber]);

  return (
    <Box display="flex" p={7} flexDirection="row" width="100%">
      <Box display="flex" p={7} flexDirection="column">
        <Heading as="h5" size="lg">
          Overview
        </Heading>
        <ProductOverview productData={mortgageFinances} />
      </Box>
      <Box display="flex" p={7} flexDirection="column" flex="1">
        <Heading as="h5" size="lg">
          Available plans
        </Heading>
        <Box bg="white" p={4} borderRadius="md" mt={4} border="1px solid #ccc">
          <SortedTable
            tableData={mortgageData}
            tableType={Constants.TABLE_TYPE.MORTGAGE}
            tablePgSize={pageSize}
            tableDataLength={mortgageDataLength}
            tableHeaders={Constants.MORTGAGE_TABLE_HEADERS}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HomeLoan;
