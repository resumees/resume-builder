/* eslint-disable react/react-in-jsx-scope */
import { ApplicantData } from "@/lib/definitions";
import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import React from "react";

type CampaignTableProps = {
    campaignName: string;
    tableData: ApplicantData[];
}

export const CampaignTable: React.FC<CampaignTableProps> = ({ campaignName, tableData }) => {
    const campaignApplicantData = () => {
        return tableData.map((data: ApplicantData, index: number) => (
            <Tr key={index + 1}>
                <Td>{index + 1}</Td> {/* Needs to be replaced with actual rank from LLM */}
                <Td>{data.contactDetails.applicantName}</Td> {/* Can either make this a link or add a button to more details */}
                <Td>13/07/2024</Td>
                <Td>89%</Td>
            </Tr>
        ));
    }

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
                    {campaignApplicantData()}
                </Tbody>
            </Table>
        </TableContainer>
    )
}