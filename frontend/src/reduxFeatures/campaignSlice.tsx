import { Campaign } from "@/components/Campaign/Campaign.config";
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CampaignState {
  userCampaigns: Campaign[];
}

const initialState: CampaignState = {
  userCampaigns: [{
    _id: "0",
    documentName: "No Campaigns Saved",
    documentDescription: "",
  },
  {
    _id: "1",
    documentName: "Create a Campaign",
    documentDescription: "",
  },
],
};

export const campaignSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    setCampaignsSlice: (state, action: PayloadAction<Campaign[]>) => {
      state.userCampaigns = action.payload;
    },
    addCampaign: (state, action: PayloadAction<Campaign>) => {
      state.userCampaigns.push({
        _id: action.payload._id,
        documentName: action.payload.documentName,
        documentDescription: action.payload.documentDescription,
      })
    }
  },
});

export const { addCampaign, setCampaignsSlice } = campaignSlice.actions;

export default campaignSlice.reducer;