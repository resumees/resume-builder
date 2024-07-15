const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  documentName: {
    type: String,
    required: true
  },
  documentDescription: {
    type: String,
    required: true
  }
});

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  campaign: [CampaignSchema]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;