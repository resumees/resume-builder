const Financials = require("../models/financials.model");
const phoneData = require("../data/phone.json");
const mortgageData = require("../data/mortgage.json");
const electricityData = require("../data/electricity_endeavour.json");
const {
  PhoneModel,
  MortgageModel,
  ElectricityModel,
  GasModel
} = require("../models/financialProducts.model");
const Constant = require("../helpers/constants");
const axios = require("axios");

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
  } else if (productType === Constant.FINANCIAL_PRODUCTS.ELECTRICITY || Constant.FINANCIAL_PRODUCTS.GAS) {
    if (params.postcode != null) {
      // API call to canstar 
      const canstarElectricityResponse = await getCanstarUtility(params, productType);

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

// This API call to origin energy takes in postcode and then returns what electricity, gas and solar providers are
// available to the postcode. It can be possible that multiple are available in a given area
const getDistributors = async (params) => {
  const { postcode } = params;
  try {
    const apiUrl = `https://www.originenergy.com.au/api/distributor/v1/postcodes/${postcode}/distributors?postcode=${postcode}&electricity=true&gas=true&solar=true`;
    const response = await axios.get(apiUrl, {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        cookie:
          "AMCV_E3470C0F53D670ED0A490D45%40AdobeOrg=179643557%7CMCMID%7C08911511953309496481158575750307972599%7CMCAID%7CNONE%7CvVersion%7C5.5.0; bzid.id=4789918a-da0b-4155-a2e2-dab7df6f17ca; bzid.created=true; intercom-id-hs2d6jw6=c9b4e729-93e9-4df3-8359-96a804d50090; intercom-device-id-hs2d6jw6=2be9dac7-5d6d-4e69-a15b-c816ebe322b5; s_ppn=originenergy:electricity-gas:plans; target_state=nsw; intercom-session-hs2d6jw6=; ab.storage.deviceId.3b8383c1-c29d-435f-8dcd-e91a86955afe=%7B%22g%22%3A%22dbaf62b0-06e0-8735-c097-6623b1358ca4%22%2C%22c%22%3A1712483512253%2C%22l%22%3A1714026447351%7D; ab.storage.userId.3b8383c1-c29d-435f-8dcd-e91a86955afe=%7B%22g%22%3A%224789918a-da0b-4155-a2e2-dab7df6f17ca%22%2C%22c%22%3A1712483512251%2C%22l%22%3A1714026447352%7D; ab.storage.sessionId.3b8383c1-c29d-435f-8dcd-e91a86955afe=%7B%22g%22%3A%221585d0d0-453d-fbf5-4bc4-00365e6bf8a1%22%2C%22e%22%3A1714028519029%2C%22c%22%3A1714026447351%2C%22l%22%3A1714026719029%7D; arp_scroll_position=292",
        referer:
          "https://www.originenergy.com.au/for-home/electricity-and-gas/info/find-my-distributor/",
        "sec-ch-ua":
          '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getCanstarUtility = async (params, productType) => {
  try {
    const response = await axios.post(
      "https://graph.canstar.com.au/graphql",
      {
        operationName: "Table",
        variables: {
          vertical: productType === Constant.FINANCIAL_PRODUCTS.ELECTRICITY
            ? Constant.UTILITY_TYPE.ELECTRICITY
            : productType === Constant.FINANCIAL_PRODUCTS.GAS
            ? Constant.UTILITY_TYPE.GAS
            : undefined,
          selectorFields: [
            {
              name: "Suburb or postcode",
              type: "string",
              value: params.postcode,
            }          
          ],
          filterFields: [
            {
              name: "Online Partner",
              value: "false",
            },
          ],
          sort: [
            {
              direction: "descending",
              field: "Brand Satisfaction",
              selected: false,
            },
            {
              direction: "descending",
              field: "Value Rank",
              selected: true,
            },
            {
              direction: "ascending",
              field: "Price/year (estimated)",
              selected: false,
            },
          ],
          pagination: {
            limit: 999,
            offset: 0,
            loadMore: 10,
          },
          featureFlags: [],
        },
        extensions: {
          persistedQuery: {
            version: 1,
            sha256Hash:
              "61977abf11f1c521c9cdb3657cfaacefcea88ae573662edf6078bc584eaa13c8",
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Cookie:
            "_pxhd=u5zee2uFRjyND-fuAgP7e4Dch5zOfAMdtpPPAt5pKc5FgJTWuh29gJ2qa9Ii7KJ6S-TEHPMSYhQBTewQnN5yew==:6xwYUL9eCfGOFrrC/Dwzdc9u2QtvBPlfVMb293HIiFsb60kQOeMKpBI32LC2pwXKrsUiktT1sIvd6BDg3YTKWtVjwr0cgubAZaYz8drznfo=",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error.response.data);
    throw error;
  }
};

module.exports = {
  uploadFinancesToDB,
  getFinancesData,
  getFinancialProductData,
};
