const Financials = require('../models/financials.model');

const uploadFinancesToDB = async (request) => {
  await Financials.findOneAndUpdate(
    { _id: request.user._id },  
    { ...request.body.data }, 
    { upsert: true } 
  );
};

module.exports = {
  uploadFinancesToDB
};