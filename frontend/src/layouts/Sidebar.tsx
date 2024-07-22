import { Box, Tab, TabList, Tabs } from "@chakra-ui/react";
import { Route, Routes, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import CreateCampaign from "@/components/Campaign/CreateCampaign";
import { CampaignTable } from "@/components/Campaign/CampaignTable";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Comparison: React.FC = () => {
  const navigate = useNavigate();

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const savedCampaigns = useSelector(
    (state: RootState) => state.global.campaigns
  );

  const handleTabChange = (index: number) => {
    setSelectedTabIndex(index);
    navigate(`/dashboard/campaign/${savedCampaigns.userCampaigns[selectedTabIndex]._id}`)
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
          {savedCampaigns.userCampaigns.map((campaign) => (
            <Tab _hover={{ bg: "gray.300" }} key={campaign._id} >{campaign.documentName}</Tab>
          ))}
        </TabList>

        <Routes>
          {savedCampaigns.userCampaigns.map((campaign) => (
            <Route key={campaign._id} path={`/${campaign._id}`} element={<CampaignTable campaignId={campaign._id} />} />
          ))}
        </Routes>
      </Tabs>
    </Box>
  );
};

export default Comparison;
