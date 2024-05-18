const axios = require("axios");
const Constant = require("../../helpers/constants");

const getCanstarUtility = async (params, productType) => {
  try {
    const response = await axios.post(
      "https://graph.canstar.com.au/graphql",
      {
        operationName: "Table",
        variables: {
          vertical:
            productType === Constant.FINANCIAL_PRODUCTS.ELECTRICITY
              ? Constant.UTILITY_TYPE.ELECTRICITY
              : productType === Constant.FINANCIAL_PRODUCTS.GAS
              ? Constant.UTILITY_TYPE.GAS
              : undefined,
          selectorFields: [
            {
              name: "Suburb or postcode",
              type: "string",
              value: params.postcode,
            },
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

const getCanstarMortgage = async (params) => {
  let selectorFieldArr = [
    {
      name: "Loan amount",
      type: "string",
      value: params.loanAmount,
    },
    {
      name: "Loan purpose",
      type: "string",
      value: params.loanPurpose,
    },
  ];
  let filterFieldsArr = [
    {
      name: "LVR",
      type: "string",
      value: "95%25%20or%20higher",
    },
    {
      name: "LVR",
      type: "string",
      value: "90%25",
    },
    {
      name: "LVR",
      type: "string",
      value: "85%25",
    },
    {
      name: "LVR",
      type: "string",
      value: "80%25",
    },
    {
      name: "LVR",
      type: "string",
      value: "70%25",
    },
    {
      name: "LVR",
      type: "string",
      value: "60%25%20or%20less",
    },
    {
      name: "Repayment type",
      type: "string",
      value: "Principal%20%26%20Interest",
    },
    {
      name: "Online Partner",
      value: "false",
    },
  ];
  let sortArr = [
    {
      direction: "ascending",
      field: "Provider",
      selected: false,
    },
    {
      direction: "descending",
      field: "Star Rating",
      selected: true,
    },
    {
      direction: "descending",
      field: "Interest rate",
      selected: false,
    },
    {
      direction: "ascending",
      field: "Comparison rate^",
      selected: false,
    },
    {
      direction: "ascending",
      field: "Monthly repayment",
      selected: false,
    },
  ];

  if (params.interestRateType) {
    filterFieldsArr.push({
      name: "Loan type",
      type: "string",
      value: params.interestRateType,
    });
  }
  if (params.repaymentType) {
    filterFieldsArr.push({
      name: "Repayment Type",
      type: "string",
      value: params.repaymentType,
    });
  }

  try {
    const response = await axios.post(
      "https://graph.canstar.com.au/graphql",
      {
        operationName: "Table",
        variables: {
          vertical: "mortgages",
          selectorFields: selectorFieldArr,
          filterFields: filterFieldsArr,
          sort: sortArr,
          pagination: {
            limit: 50,
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

const getCanstarPhone = async (params) => {
  let selectorFieldArr = [
    {
      name: "Plan Type",
      type: "string",
      value: params.planType,
    },
    {
      name: "Average Monthly Data",
      type: "string",
      value: params.monthlyData,
    },
    {
      name: "Data Allowance /billing period",
      type: "string",
      value: params.monthlyData,
    },
  ];
  let filterFieldsArr = [
    {
      name: "Plan length",
      value: "24 months or less",
    },
  ];
  let sortArr = [
    {
      direction: "ascending",
      field: "Provider",
      selected: false,
    },
    {
      direction: "descending",
      field: "Value Rank",
      selected: true,
    },
  ];

  if (params.planType) {
    if (params.planType === "Sim only") {
      filterFieldsArr.push({
        name: "Plan length",
        value: "24 months or less",
      });
      sortArr.push(
        {
          direction: "descending",
          field: "Data Allowance",
          selected: false,
        },
        {
          direction: "ascending",
          field: "Advertised Cost",
          selected: false,
        }
      );
    } else if (params.planType === "Phone on a plan") {
      filterFieldsArr.push({
        name: "Contract period",
        type: "string",
        value: "36 Months or less",
      });
      sortArr.push(
        {
          direction: "descending",
          field: "Data Allowance /billing period",
          selected: false,
        },
        {
          direction: "ascending",
          field: "Advertised Cost /billing period",
          selected: false,
        }
      );
    }
  }

  try {
    const response = await axios.post(
      "https://graph.canstar.com.au/graphql",
      {
        operationName: "Table",
        variables: {
          vertical: "mobile",
          selectorFields: selectorFieldArr,
          filterFields: filterFieldsArr,
          sort: sortArr,
          pagination: {
            limit: 50,
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
  getCanstarUtility,
  getCanstarPhone,
  getCanstarMortgage,
};
