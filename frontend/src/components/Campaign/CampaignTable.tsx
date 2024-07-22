/* eslint-disable react/react-in-jsx-scope */
import { ApplicantData } from "@/lib/definitions";
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

type CampaignTableProps = {
  campaignId: string;
};

export const CampaignTable: React.FC<CampaignTableProps> = ({ campaignId }) => {
  const [campaignName, setCampaignName] = useState("");
  const [campaignData, setCampaignData] = useState([]);
  const toast = useToast();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/campaign/load/${campaignId}`, {
        credentials: "include"
    }
    )
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setCampaignName(data.currentCampaign.documentName);
        setCampaignData(data.currentCampaign.applicant);
      })
      .catch((error) => {
        console.error("Load campaign error:", error);
        toast({
          title: `Load Campaign Error`,
          description: `Error loading campaign: ${error}`,
        });
      });
  });

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>{campaignName} Applicants</TableCaption>
        <Thead>
          <Tr>
            <Th>Rank</Th>
            <Th>Applicant Name</Th>
            <Th>Date Submitted</Th>
            <Th>Score</Th>
          </Tr>
        </Thead>
        <Tbody>
          {campaignData?.map((data: ApplicantData, index: number) => (
            <Tr key={index + 1}>
              <Td>{index + 1}</Td>
              <Td>{data.documentName}</Td>
              <Td>{data.submittedDate.toString()}</Td>
              <Td>{data.candidateScore}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
