const Financials = require('../models/financials.model');

const uploadFinancesToDB = async (request) => {
  await Financials.findOneAndUpdate(
    { _id: request.user._id },  
    { ...request.body.data }, 
    { upsert: true } 
  );
};

const getFinancesData = async (request) => {
  const finances = await Financials.findOne({ _id: request.user._id });
  return finances;
};

module.exports = {
  uploadFinancesToDB,
  getFinancesData
};