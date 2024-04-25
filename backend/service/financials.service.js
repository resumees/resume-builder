const Financials = require("../models/financials.model");
const phoneData = require("../data/phone.json");
const mortgageData = require("../data/mortgage.json");
const electricityData = require("../data/electricity_endeavour.json");
const {
  PhoneModel,
  MortgageModel,
  ElectricityModel
} = require("../models/financialProducts.model");
const Constant = require("../helpers/constants");

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

// To:do Implement sorting algorithm
const getFinancialProductData = (page, pageSize, productType) => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  let productModel;
  let productDataLength;

  if (productType === Constant.FINANCIAL_PRODUCTS.PHONE) {
    productModel = phoneData.data.table.products
      .slice(start, end)
      .map((phoneProduct) => {
        return new PhoneModel(
          phoneProduct.logo,
          phoneProduct.title,
          phoneProduct.callsToAction.map((action) => action.text),
          phoneProduct.properties.values,
          phoneProduct.callsToAction.find(
            (action) => action.type === "costBreakDown"
          ).text,
          phoneProduct.link
        );
      });
    productDataLength = phoneData.data.table.products.length;
  } else if (productType === Constant.FINANCIAL_PRODUCTS.MORTGAGE) {
    productModel = mortgageData.data.table.products
      .slice(start, end)
      .map((mortgageProduct) => {
        return new MortgageModel(
          mortgageProduct.logo,
          mortgageProduct.title,
          mortgageProduct.properties.values.find(
            (obj) => obj.text === "Interest rate"
          ).value,
          mortgageProduct.properties.values.find(
            (obj) => obj.text === "Comparison rate^"
          ).value,
          mortgageProduct.properties.values.find(
            (obj) => obj.text === "Monthly repayment"
          ).value,
          mortgageProduct.link
        );
      });
      productDataLength = mortgageData.data.table.products.length;  
  } else if (productType === Constant.FINANCIAL_PRODUCTS.UTILITIES) {
    productModel = electricityData.data.table.products
      .slice(start, end)
      .map((electricityProduct) => {
        return new ElectricityModel(
          electricityProduct.logo,
          electricityProduct.title,
          electricityProduct.properties.values.find(
            (obj) => obj.text === "Reference price"
          ).value,
          electricityProduct.properties.values.find(
            (obj) => obj.text === "Price/year (estimated)"
          ).value,
          electricityProduct.link
        );  
      })
      productDataLength = electricityData.data.table.products.length;  
  }

  return {
    productData: productModel,
    productDataLength: productDataLength,
  };
};

module.exports = {
  uploadFinancesToDB,
  getFinancesData,
  getFinancialProductData,
};
