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
import React from "react";
import { useQuery } from "react-query";
import { upsertCampaign } from "@/reduxFeatures/campaignSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

type CampaignTableProps = {
  campaignId: string;
};

export const CampaignTable: React.FC<CampaignTableProps> = ({ campaignId }) => {

  const toast = useToast();
  const dispatch = useDispatch();

  const campaignData = useSelector(
    (state: RootState) => state.global.campaigns.userCampaigns.find(
      (campaign) => campaign._id === campaignId
    )
  );

  const { isLoading } = useQuery(
    [`load${campaignId}`, campaignId],
    () =>
      fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/campaign/load/${campaignId}`,
        {
          credentials: "include",
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          dispatch(upsertCampaign(data))
        })
        .catch((error) => {
          console.error("Load campaign error:", error);
          toast({
            title: `Load Campaign Error`,
            description: `Error loading campaign: ${error}`,
          });
        }),
    {
      refetchInterval: false,
      enabled: true,
      refetchOnMount: "always",
      refetchOnWindowFocus: false,
      cacheTime: 60000,
      staleTime: 60000,
    }
  );

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <TableContainer>
            <Table variant="simple">
              <TableCaption>{campaignData?.documentName} Applicants</TableCaption>
              <Thead>
                <Tr>
                  <Th>Rank</Th>
                  <Th>Applicant Name</Th>
                  <Th>Date Submitted</Th>
                  <Th>Score</Th>
                </Tr>
              </Thead>
              <Tbody>
                {campaignData?.applicant?.map((data: ApplicantData, index: number) => (
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
        </>
      )}
    </>
  );
};
