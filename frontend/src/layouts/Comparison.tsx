import { Box, Tab, TabList, Tabs } from "@chakra-ui/react";
import { Route, Routes, useNavigate } from "react-router-dom";
import React from "react";
import HomeLoan from "../components/comparison/HomeLoan";
import Phone from "../components/comparison/Phone";

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
        navigate(`/finances/comparison/utilities?pageNumber=1`);
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
          <Tab _hover={{ bg: "gray.300" }}>Utilities</Tab>
        </TabList>

        <Routes>
          <Route path="/homeloans" element={<HomeLoan />} />
          <Route path="/phone" element={<Phone />} />
          <Route path="/utilities" element={<h1>Utilities</h1>} />
        </Routes>
      </Tabs>
    </Box>
  );
};

export default Comparison;
