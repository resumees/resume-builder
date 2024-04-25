import React, { useEffect, useState } from "react";
import ProductOverview from "./ProductOverview";
import { Box, Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import SortedTable from "../ui/SortedTable";
import request from "@/util/api";
import { useLocation } from "react-router-dom";
import Constants from "@/constants";

type ProductComparisonProps = {
  ProductType: string;
};

const ProductComparison: React.FC<ProductComparisonProps> = ({
  ProductType,
}) => {
  const financeInput = useSelector((state: RootState) =>
    state.global.financials.expenses.find(
      (item: ExpenseItem) => item.category === ProductType
    )
  );

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pageNumber = parseInt(params.get("pageNumber") || "1", 10);
  const pageSize = 5;

  const [financeData, setFinanceData] = useState([]);
  const [financeDataLength, setFinanceDataLength] = useState(0);
  const [tableHeader, setTableHeader] = useState<string[]>([]);

  useEffect(() => {
    request(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/financials/comparison?productType=${ProductType.toLowerCase()}&page=${pageNumber}&pageSize=${pageSize}`,
      "GET"
    ).then((res: any) => {
      console.log(res.data);
      setFinanceData(res.data.productData);
      setFinanceDataLength(res.data.productDataLength);
    });
  }, [pageNumber]);

  useEffect(() => {
    const tableHeadersMap = {
      [Constants.TABLE_TYPE.MORTGAGE]: Constants.MORTGAGE_TABLE_HEADERS,
      [Constants.TABLE_TYPE.PHONE]: Constants.PHONE_TABLE_HEADERS,
      [Constants.TABLE_TYPE.UTILITIES]: Constants.UTILITIY_TABLE_HEADERS
    };
    if (tableHeadersMap.hasOwnProperty(ProductType)) {
      setTableHeader(tableHeadersMap[ProductType]);
    }
  }, [ProductType]);

  return (
    <Box display="flex" p={7} flexDirection="row" width="100%">
      <Box display="flex" p={7} flexDirection="column">
        <Heading as="h5" size="lg">
          Overview
        </Heading>
        <ProductOverview productData={financeInput} />
      </Box>
      <Box display="flex" p={7} flexDirection="column" flex="1">
        <Heading as="h5" size="lg">
          Available plans
        </Heading>
        <Box bg="white" p={4} borderRadius="md" mt={4} border="1px solid #ccc">
          <SortedTable
            tableData={financeData}
            tableType={ProductType}
            tablePgSize={pageSize}
            tableDataLength={financeDataLength}
            tableHeaders={tableHeader}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductComparison;
