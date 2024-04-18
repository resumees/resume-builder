class PhoneModel {
    constructor(company, title, information, data, cost, CTA) {
        this.company = company;
        this.title = title;
        this.information = information;
        this.data = data;
        this.cost = cost;
        this.CTA = CTA;
    }
}

class MortgageModel {
    constructor(company, information, interestRate, comparisonRate, monthlyRepayment, CTA) {
        this.company = company;
        this.information = information;
        this.interestRate = interestRate;
        this.comparisonRate = comparisonRate;
        this.monthlyRepayment = monthlyRepayment;
        this.CTA = CTA;
    }
}

module.exports = {
    PhoneModel,
    MortgageModel
};
