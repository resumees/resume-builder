import { Box, Tab, TabList, Tabs } from "@chakra-ui/react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import CreateCampaign from "@/components/Campaign/CreateCampaign";
import { CampaignTable } from "@/components/Campaign/CampaignTable";
import { TEST_APPLICANT_DATA } from "@/components/Campaign/Campaign.config";

const Comparison: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State to keep track of the selected tab index
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard/campaign":
        setSelectedTabIndex(0);
        break;
      case "/dashboard/campaign/create":
        setSelectedTabIndex(0);
        break;
      case "/dashboard/campaign/other":
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
        navigate(`/dashboard/campaign/create`);
        break;
      case 1:
        navigate(`/dashboard/campaign/other`);
        break;
      default:
        navigate(`/dashboard/campaign/create`);
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
          <CreateCampaign />
          <Tab _hover={{ bg: "gray.300" }}>Campaigns</Tab>
          <Tab _hover={{ bg: "gray.300" }}>{`${location.pathname}: ${selectedTabIndex}`}</Tab>
        </TabList>

        <Routes>
          <Route path="/create" element={<CreateCampaign />} />
          <Route path="/other" element={<CampaignTable campaignName="Test" tableData={TEST_APPLICANT_DATA} />} />
        </Routes>
      </Tabs>
    </Box>
  );
};

export default Comparison;
