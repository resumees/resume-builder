const mongoose = require('mongoose');

const FinancialsSchema = new mongoose.Schema({
  _id: String, 
  income: Array,
  expenses: Array,
  totalIncome: Number,
  totalExpense: Number
});

module.exports = mongoose.model('Financials', FinancialsSchema, 'financials');