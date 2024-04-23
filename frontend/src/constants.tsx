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
        UTILITIES: "Utilities",
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
};

export default Constants;
