const User = require("../models/user.model");
const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/jwt");

router.post("/api/campaign/new", authenticateJWT, async (req, res) => {
  try {
    const userId = req.user._id;
    const { documentName, documentDescription } = req.body;

    if (!documentName || !documentDescription) {
      return res.status(400).send("Campaign name and description are required");
    }

    const user = await User.findOne({ _id: userId });
  
    if (!user) {
      return res.status(404).send("User not found");
    }

    const newCampaign = {
      documentName: documentName,
      documentDescription: documentDescription,
    };

    const pushResponse = user.campaign.push(newCampaign);
    const saveResponse = await user.save();
    
    const savedCampaign = saveResponse.campaign[saveResponse.campaign.length - 1];

    // res.status(201).json({message: "Campaign saved successfully", savedCampaignId: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)});
    res.status(201).json({message: "Campaign saved successfully", savedCampaignId: savedCampaign._id});
  } catch (error) {
    res.status(500).json({message: `Server error: ${error}`});
  }
});

router.get("/api/campaign/load/:campaignId", authenticateJWT, async (req, res) => {
  const user = await User.findOne(req.user._id);
  const campaignId = req.params.campaignId;

  if (user && campaignId) {
    const selectedCampaign = user.campaign.find(campaign => campaign._id.toString() === campaignId);

    if (selectedCampaign) {
      res.json({
        message: `${selectedCampaign.documentName} loaded successfully.`,
        currentCampaign: selectedCampaign,
      })
    } else {
      res.status(500).send("This campaign does not exist")
    }
  } else {
    res.status(500).send("No valid user found")
  }
});

module.exports = router;