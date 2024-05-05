import { Box, Tab, TabList, Tabs } from "@chakra-ui/react";
import { Route, Routes, useNavigate } from "react-router-dom";
import React from "react";
import ProductComparison from "@/components/comparison/ProductComparison";
import Constants from "@/constants";

const Comparison: React.FC = () => {
  const navigate = useNavigate();

  const handleTabChange = (index: number) => {
    switch (index) {
      case 0:
        navigate(`/finances/comparison/homeloans?pageNumber=1`);
        break;
      case 1:
        navigate(`/finances/comparison/phone?pageNumber=1`);
        break;
      case 2:
        navigate(`/finances/comparison/electricity?pageNumber=1`);
        break;
      case 3:
        navigate(`/finances/comparison/gas?pageNumber=1`);
        break;
      default:
        break;
    }
  };

  return (
    <Box w="100%" h="100%">
      <Tabs h="100%" isLazy orientation="vertical" onChange={handleTabChange}>
        <TabList bg="lightblue">
          <Tab _hover={{ bg: "gray.300" }}>Home loans</Tab>
          <Tab _hover={{ bg: "gray.300" }}>Phone</Tab>
          <Tab _hover={{ bg: "gray.300" }}>Electricity</Tab>
          <Tab _hover={{ bg: "gray.300" }}>Gas</Tab>
        </TabList>

        <Routes>
          <Route
            path="/homeloans"
            element={
              <ProductComparison
                key={`${Constants.TABLE_TYPE.MORTGAGE}`}
                ProductType={Constants.TABLE_TYPE.MORTGAGE}
              />
            }
          />
          <Route
            path="/phone"
            element={
              <ProductComparison
                key={`${Constants.TABLE_TYPE.PHONE}`}
                ProductType={Constants.TABLE_TYPE.PHONE}
              />
            }
          />
          <Route
            path="/electricity"
            element={
              <ProductComparison
                key={`${Constants.TABLE_TYPE.ELECTRICITY}`}
                ProductType={Constants.TABLE_TYPE.ELECTRICITY}
              />
            }
          />
          <Route
            path="/gas"
            element={
              <ProductComparison
                key={`${Constants.TABLE_TYPE.GAS}`}
                ProductType={Constants.TABLE_TYPE.GAS}
              />
            }
          />
        </Routes>
      </Tabs>
    </Box>
  );
};

export default Comparison;
