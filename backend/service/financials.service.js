const Financials = require('../models/financials.model');

const uploadFinancesToDB = async (request) => {
  const financials = new Financials(request.data);
  await financials.save();
};

module.exports = {
  uploadFinancesToDB
};