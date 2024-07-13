import { Box, Tab, TabList, Tabs } from "@chakra-ui/react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Campaign from "@/components/Campaign/Campaign";

const Comparison: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State to keep track of the selected tab index
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  useEffect(() => {
    switch (location.pathname) {
      case "/campaign":
        setSelectedTabIndex(0);
        break;
      case "/campaign/create":
        setSelectedTabIndex(0);
        break;
      case "/campaign/other":
        setSelectedTabIndex(1);
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
        navigate(`/campaign/create`);
        break;
      case 1:
        navigate(`/campaign/other`);
        break;
      default:
        navigate(`/campaign/create`);
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
          <Tab _hover={{ bg: "gray.300" }}>Campaigns</Tab>
          <Tab _hover={{ bg: "gray.300" }}>Another section</Tab>
        </TabList>

        <Routes>
          <Route path="/create" element={<Campaign />} />
          <Route path="/other" element={<h1>other!</h1>} />
        </Routes>
      </Tabs>
    </Box>
  );
};

export default Comparison;
