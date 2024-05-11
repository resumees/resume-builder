const Constants = {
    TYPE_INCOME: "Income",
    TYPE_EXPENSE: "Expense",
    FREQUENCY_ANNUAL: 1,
    FREQUENCY_MONTHLY: 12,
    FREQUENCY_WEEKLY: 52,
    FREQUENCY_DAILY: 365,
    TABLE_TYPE: {
        INTERNET: "Internet",
        PHONE: "Phone",
        MORTGAGE: "Mortgage",
        ELECTRICITY: "Electricity",
        GAS: "Gas"
    },
    PHONE_TABLE_HEADERS: [
        "company",
        "information",
        "data",
        "cost",
        "CTA"
    ],
    MORTGAGE_TABLE_HEADERS: [
        "company",
        "information",
        "interest rate",
        "comparison rate",
        "monthly payment",
        "CTA"
    ],
    ELECTRICITY_TABLE_HEADERS: [
        "company",
        "information",
        "referencePrice",
        "estimatedCost",
        "CTA"
    ],
    GAS_TABLE_HEADERS: [
        "company",
        "information",
        "supplyCharge",
        "usageCharge",
        "Total Estimated Cost",
        "CTA"
    ],
    MORTGAGE_SEARCHBOX: {
        LOAN_AMOUNT: {
            TITLE: "Loan Amount",
            PLACEHOLDER: "Enter the amount you want to borrow"
        },
        LOAN_PURPOSE: {
            TITLE: "Loan Purpose",
            REFINANCE: "Refinance",
            BUYING_NEXT_HOME: "Buying next home",
            BUYING: "Buying",
            INVESTING: "Investing"
        },
        REPAYMENT_TYPE: {
            TITLE: "Repayment Type",
            PRINCIPAL: "Principal & Interest",
            INTEREST: "Interest Only"
        },
        FEATURES: {
            OFFSET: "Offset",
            REDRAW: "Redraw",
        },
        INTEREST_RATE_TYPE: {
            TITLE: "Interest Rate Type",
            FIXED_1: "Fixed loan 1 year",
            FIXED_2: "Fixed loan 2 years",
            FIXED_3: "Fixed loan 3 years",
            FIXED_4: "Fixed loan 4 years",
            FIXED_5: "Fixed loan 5 years",
            VARIABLE: "Variable"
        }
    },
    PHONE_SEARCHBOX: {
        PLAN_TYPE: {
            TITLE: "Plan Type",
            PHONE_INTERNET: "Phone and Internet plan",
            PHONE_INTERNET_API: "Phone on a plan",
            SIM_ONLY: "Sim only",
        },
        DATA_ALLOWANCE: {
            TITLE: "Data allowance / month",
            MB_500: "500MB",
            GB_1: "1GB",
            GB_5: "5GB",
            GB_10: "10GB",
            GB_20: "20GB",
            GB_40: "40GB",
            GB_60: "60GB",
            GB_80: "80GB",
            GB_100: "100GB",
        }
    }
};

export default Constants;
