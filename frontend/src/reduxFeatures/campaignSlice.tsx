import { CampaignData } from "@/lib/definitions";
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CampaignState {
  userCampaigns: CampaignData[];
}

const initialState: CampaignState = {
  userCampaigns: [],
};

export const campaignSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    setCampaignsSlice: (state, action: PayloadAction<CampaignData[]>) => {
      state.userCampaigns = action.payload;
    },
    addCampaign: (state, action: PayloadAction<CampaignData>) => {
      state.userCampaigns.push({
        _id: action.payload._id,
        documentName: action.payload.documentName,
        documentDescription: action.payload.documentDescription,
        applicant: []
      })
    },
    upsertCampaign: (state, action: PayloadAction<CampaignData>) => {
      const campaignIndex = state.userCampaigns.findIndex(
        (campaign) => campaign._id === action.payload._id
      );
      campaignIndex === -1 ? state.userCampaigns.push({
        _id: action.payload._id,
        documentName: action.payload.documentName,
        documentDescription: action.payload.documentDescription,
        applicant: []
      })
      :
      state.userCampaigns[campaignIndex] = action.payload;
    }
  },
});

export const { addCampaign, setCampaignsSlice, upsertCampaign } = campaignSlice.actions;

export default campaignSlice.reducer;