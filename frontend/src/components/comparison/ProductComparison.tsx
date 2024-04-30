import React, { useEffect, useState } from "react";
import ProductOverview from "./ProductOverview";
import { Box, Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import SortedTable from "../ui/SortedTable";
import request from "@/util/api";
import { useLocation } from "react-router-dom";
import Constants from "@/constants";
import SearchUtilities from "./SearchUtilities";

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

  const searchParams = useSelector((state: RootState) => {
    if (ProductType === Constants.TABLE_TYPE.UTILITIES) {
      return state.global.comparison.utility;
    } else if (ProductType === Constants.TABLE_TYPE.MORTGAGE) {
      return state.global.comparison.mortgage;
    } else if (ProductType === Constants.TABLE_TYPE.PHONE) {
      return state.global.comparison.phone;
    }
  });

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pageNumber = parseInt(params.get("pageNumber") || "1", 10);
  const pageSize = 5;

  const [financeData, setFinanceData] = useState([]);
  const [financeDataLength, setFinanceDataLength] = useState(0);
  const [tableHeader, setTableHeader] = useState<string[]>([]);

  useEffect(() => {
    const params = new URLSearchParams({
      productType: ProductType.toLowerCase(),
      page: pageNumber.toString(),
      pageSize: pageSize.toString(),
      ...(searchParams !== null ? { params: JSON.stringify(searchParams) } : {}),
    });

    request(
      `${import.meta.env.VITE_BACKEND_URL}/financials/comparison?${params}`,
      "GET"
    ).then((res: any) => {
      console.log(res.data);
      setFinanceData(res.data.productData);
      setFinanceDataLength(res.data.productDataLength);
    });
  }, [pageNumber, searchParams]);

  useEffect(() => {
    const tableHeadersMap = {
      [Constants.TABLE_TYPE.MORTGAGE]: Constants.MORTGAGE_TABLE_HEADERS,
      [Constants.TABLE_TYPE.PHONE]: Constants.PHONE_TABLE_HEADERS,
      [Constants.TABLE_TYPE.UTILITIES]: Constants.UTILITIY_TABLE_HEADERS,
    };
    if (tableHeadersMap.hasOwnProperty(ProductType)) {
      setTableHeader(tableHeadersMap[ProductType]);
    }
  }, [ProductType]);

  return (
    <Box display="flex" p={7} flexDirection="row" width="100%">
      <Box display="flex" p={7} flexDirection="column">
        <>
          <Heading as="h5" size="lg">
            Overview
          </Heading>
          <ProductOverview productData={financeInput} />
          {ProductType === Constants.TABLE_TYPE.UTILITIES && (
            <SearchUtilities />
          )}
        </>
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
