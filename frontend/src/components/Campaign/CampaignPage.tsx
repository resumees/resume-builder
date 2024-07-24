import { Box, Divider, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { CampaignTable } from "./CampaignTable";
import DeleteCampaign from "./DeleteCampaign";
import { CampaignPageProps } from "./Campaign.config";

export const CampaignPage: React.FC<CampaignPageProps> = ({
  campaignId,
  campaignTitle,
}) => {
  return (
    <Box w="100%" h="100%">
      <Heading>{campaignTitle} Dashboard</Heading>
      <Flex>
      <Box w="80%" m="auto">
        <CampaignTable campaignId={campaignId} />
        <DeleteCampaign campaignId={campaignId} campaignTitle={campaignTitle} />
      </Box>
      </Flex>
    </Box>
  );
};
