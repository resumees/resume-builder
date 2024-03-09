import { Box, Tab, TabList, Tabs } from "@chakra-ui/react";
import { Route, Routes, useNavigate } from "react-router-dom";
import React from "react";

const Comparison: React.FC = () => {
  const navigate = useNavigate();

  const handleTabChange = (index: number) => {
    switch (index) {
      case 0:
        navigate("/finances/comparison/homeloans");
        break;
      case 1:
        navigate("/finances/comparison/internet");
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
      <Tabs isLazy orientation="vertical" onChange={handleTabChange}>
        <TabList>
          <Tab _hover={{ bg: "gray.300" }}>Home loans</Tab>
          <Tab _hover={{ bg: "gray.300" }}>Internet</Tab>
          <Tab _hover={{ bg: "gray.300" }}>Insurance</Tab>
        </TabList>

        <Routes>
          <Route path="/homeloans" element={<h1>Home loan</h1>} />
          <Route path="/internet" element={<h1>internet</h1>} />
          <Route path="/insurance" element={<h1>insurance</h1>} />
        </Routes>
      </Tabs>
    </Box>
  );
};

export default Comparison;