const User = require("../models/user.model");
const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/jwt");

router.get('/api/campaign/load', authenticateJWT, async (req, res) => {
  console.log("/api/campaign/load called");
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
  console.log("/api/campaign/new called");
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
      documentName,
      documentDescription
    };

    user.campaign.push(newCampaign);
    await user.save();

    res.status(201).json({message: "Campaign saved successfully", newCampaign});
  } catch (error) {
    res.status(500).json({message: `Server error: ${error}`});
  }
});

module.exports = router;