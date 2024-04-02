const Financials = require("../models/financials.model");
const phoneData = require("../data/phone.json");
const PhoneModel = require("../models/financialProducts.model");

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

const getPhoneData = (page, pageSize) => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  let phoneModels = phoneData.data.table.products.slice(start, end).map(phoneProduct => {
    return new PhoneModel(
      phoneProduct.logo,
      phoneProduct.callsToAction.map(action => action.text),
      phoneProduct.properties.values,
      phoneProduct.callsToAction.find(action => action.type === "costBreakDown").text,
      phoneProduct.link
    );
  });

  return phoneModels;
};

module.exports = {
  uploadFinancesToDB,
  getFinancesData,
  getPhoneData,
};
