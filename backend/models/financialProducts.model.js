class PhoneModel {
    constructor(company, title, information, data, cost, link, CTA) {
        this.company = company;
        this.title = title;
        this.information = information;
        this.data = data;
        this.cost = cost;
        this.link = link;
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

class ElectricityModel {
    constructor(company, information, referencePrice, estimatedCost, CTA) {
        this.company = company;
        this.information = information;
        this.referencePrice = referencePrice;
        this.estimatedCost = estimatedCost;
        this.CTA = CTA;
    }
}

class GasModel {
    constructor(company, information, supplyCharge, usageCharge, totalCost, CTA) {
        this.company = company;
        this.information = information;
        this.supplyCharge = supplyCharge;
        this.usageCharge = usageCharge;
        this.totalCost = totalCost;
        this.CTA = CTA;
    }
}

module.exports = {
    PhoneModel,
    MortgageModel,
    ElectricityModel,
    GasModel
};
