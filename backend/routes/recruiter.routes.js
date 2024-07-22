const User = require("../models/user.model");
const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/jwt");

router.get('/api/campaign/load', authenticateJWT, async (req, res) => {
    try {
      const userId = req.user._id;
      const user = await User.findOne({ _id: userId });
  
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const storedCampaigns = user.campaign;
  
      if (storedCampaigns && storedCampaigns.length > 0) {
        res.json({ returnedCampaigns: storedCampaigns });
      } else {
        res.status(404).send("No campaigns found");
      }
    } catch (error) {
      res.status(500).send("Server error");
    }
  });

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

    // const pushResponse = user.campaign.push(newCampaign);
    // const saveResponse = await user.save();
    
    // const savedCampaign = saveResponse.campaign[saveResponse.campaign.length - 1];

    res.status(201).json({message: "Campaign saved successfully", savedCampaignId: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)});
  } catch (error) {
    res.status(500).json({message: `Server error: ${error}`});
  }
});

module.exports = router;