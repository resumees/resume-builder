import { Box, Tab, TabList, Tabs } from "@chakra-ui/react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ProductComparison from "@/components/comparison/ProductComparison";
import Constants from "@/constants";

const Comparison: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State to keep track of the selected tab index
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  // Update selectedTabIndex when location pathname changes
  useEffect(() => {
    switch (location.pathname) {
      case "/comparison/homeloans":
        setSelectedTabIndex(0);
        break;
      case "/comparison/phone":
        setSelectedTabIndex(1);
        break;
      case "/comparison/electricity":
        setSelectedTabIndex(2);
        break;
      case "/comparison/gas":
        setSelectedTabIndex(3);
        break;
      case "/comparison/internet":
        setSelectedTabIndex(4);
        break;
      default:
        setSelectedTabIndex(0);
        break;
    }
  }, [location.pathname]);

  const handleTabChange = (index: number) => {
    setSelectedTabIndex(index); // Update selectedTabIndex
    switch (index) {
      case 0:
        navigate(`/comparison/homeloans?pageNumber=1`);
        break;
      case 1:
        navigate(`/comparison/phone?pageNumber=1`);
        break;
      case 2:
        navigate(`/comparison/electricity?pageNumber=1`);
        break;
      case 3:
        navigate(`/comparison/gas?pageNumber=1`);
        break;
      case 4:
        navigate(`/comparison/internet?pageNumber=1`);
        break;
      default:
        break;
    }
  };

  return (
    <Box w="100%" h="100%">
      <Tabs
        h="100%"
        isLazy
        orientation="vertical"
        onChange={handleTabChange}
        index={selectedTabIndex}
      >
        <TabList bg="lightblue">
          <Tab _hover={{ bg: "gray.300" }}>Home loans</Tab>
          <Tab _hover={{ bg: "gray.300" }}>Phone</Tab>
          <Tab _hover={{ bg: "gray.300" }}>Electricity</Tab>
          <Tab _hover={{ bg: "gray.300" }}>Gas</Tab>
          <Tab _hover={{ bg: "gray.300" }}>Internet</Tab>
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
          <Route
            path="/internet"
            element={
              <ProductComparison
              key={`${Constants.TABLE_TYPE.INTERNET}`}
              ProductType={Constants.TABLE_TYPE.INTERNET}
              />
            }
          />
        </Routes>
      </Tabs>
    </Box>
  );
};

export default Comparison;
