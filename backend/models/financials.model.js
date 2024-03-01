const mongoose = require('mongoose');

const FinancialsSchema = new mongoose.Schema({
  income: Array,
  expenses: Array,
  totalIncome: Number,
  totalExpense: Number
});

module.exports = mongoose.model('Financials', FinancialsSchema, 'financials');