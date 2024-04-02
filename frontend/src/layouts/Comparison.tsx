import { Box, Tab, TabList, Tabs } from "@chakra-ui/react";
import { Route, Routes, useNavigate } from "react-router-dom";
import React from "react";
import HomeLoan from "../components/comparison/HomeLoan";
import Internet from "../components/comparison/Internet";

const Comparison: React.FC = () => {
  const navigate = useNavigate();

  const handleTabChange = (index: number) => {
    switch (index) {
      case 0:
        navigate("/finances/comparison/homeloans");
        break;
      case 1:
        const params = new URLSearchParams({ pageNumber: '1' });
        navigate(`/finances/comparison/internet?${params.toString()}`);
        break;
      case 2:
        navigate("/finances/comparison/insurance");
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
          <Tab _hover={{ bg: "gray.300" }}>Internet</Tab>
          <Tab _hover={{ bg: "gray.300" }}>Insurance</Tab>
        </TabList>

        <Routes>
          <Route path="/homeloans" element={<HomeLoan />} />
          <Route path="/internet" element={<Internet />} />
          <Route path="/insurance" element={<h1>insurance</h1>} />
        </Routes>
      </Tabs>
    </Box>
  );
};

export default Comparison;
