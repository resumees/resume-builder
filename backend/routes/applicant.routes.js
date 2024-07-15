const User = require("../models/user.model");
const express = require("express");
const router = express.Router();

router.get('/apply/campaigns/:userId/:campaignId', async (req, res) => {
    const userId = req.params.userId;
    const campaignId = req.params.campaignId;

    let user = await User.findOne({ _id: userId})
    if (user) {
        const userCampaign = user.campaign.find(campaign => campaign._id.toString() === campaignId)
        if (userCampaign) {
            res.send(userCampaign);
        } else {
            res.status(500).send("This campaign does not exist")
        }
    } else {
        res.status(500).send("no user found")
    }
});

module.exports = router;