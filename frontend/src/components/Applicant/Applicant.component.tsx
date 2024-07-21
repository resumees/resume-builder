import request from "@/util/api";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Campaign } from "./Applicant.config";

export const Applicant: React.FC = () => {
  const { userId, campaignId } = useParams<{
    userId: string;
    campaignId: string;
  }>();
  
  const [campaign, setCampaign] = useState<Campaign>({
    documentName: '',
    documentDescription: ''
  });

  const { isLoading } = useQuery(
    ["checkAuth", userId, campaignId],
    () =>
      request(
        `${import.meta.env.VITE_BACKEND_URL}/apply/campaigns/${userId}/${campaignId}`,
        "GET"
      ),
    {
      refetchInterval: false,
      enabled: !!userId && !!campaignId, // Ensure the query only runs if parameters are defined
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      cacheTime: 60000,
      staleTime: 60000,
      onSuccess: (data) => {
        setCampaign({
            documentName: data.documentName,
            documentDescription: data.documentDescription,
        })
      },
    }
  );

  return <>
    {isLoading ? <h1>Loading...</h1> 
    : 
    <>
        <h1>Name: {campaign?.documentName}</h1>
        <h1>Description: {campaign?.documentDescription}</h1>
    </>
    }
    </>;
};
