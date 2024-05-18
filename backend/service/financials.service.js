const Financials = require("../models/financials.model");
const phoneData = require("../data/phone.json");
const {
  PhoneModel,
  MortgageModel,
  ElectricityModel,
  GasModel
} = require("../models/financialProducts.model");
const Constant = require("../helpers/constants");
const { getCanstarUtility, getCanstarMortgage, getCanstarPhone } = require("./api/canstar");

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
const getFinancialProductData = async (page, pageSize, productType, params) => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  let productModel;
  let productDataLength;

  if (productType === Constant.FINANCIAL_PRODUCTS.PHONE) {

    const canstarPhoneResponse = await getCanstarPhone(params);
    productModel = canstarPhoneResponse.data.table.products
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
    productDataLength = canstarPhoneResponse.data.table.products.length;
  } else if (productType === Constant.FINANCIAL_PRODUCTS.MORTGAGE) {
    console.log(params)
    const canstarMortgageResponse = await getCanstarMortgage(params);

    productModel = canstarMortgageResponse.data.table.products
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
    productDataLength = canstarMortgageResponse.data.table.products.length;
  } else if (productType === Constant.FINANCIAL_PRODUCTS.ELECTRICITY || Constant.FINANCIAL_PRODUCTS.GAS) {
    console.log(params)
    if (params.postcode != null) {
      // API call to canstar 
      const canstarElectricityResponse = await getCanstarUtility(params, productType)

      // This is to check whether the canstar api response was successful
      productDataLength = canstarElectricityResponse.data.table.products.length;
      console.log(`Length is: ${productDataLength}`);

      // Create response for frontend
      if (productType === Constant.FINANCIAL_PRODUCTS.ELECTRICITY) {
        productModel = canstarElectricityResponse.data.table.products
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
        });
      } else if (productType === Constant.FINANCIAL_PRODUCTS.GAS) {
        productModel = canstarElectricityResponse.data.table.products
        .slice(start, end)
        .map((gasProduct) => {
          return new GasModel(
            gasProduct.logo,
            gasProduct.title,
            gasProduct.properties.values.find(
              (obj) => obj.text === "Supply charge"
            ).value,
            gasProduct.properties.values.find(
              (obj) => obj.text === "Usage charge"
            ).value,
            gasProduct.properties.values.find(
              (obj) => obj.text === "Price/year (estimated)"
            ).value,
            gasProduct.link
          );
        });
      }
    } else {
      return {
        error: "postcode is null",
      };
    }
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
