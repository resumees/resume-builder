import { createSlice } from "@reduxjs/toolkit";
import constants from "../../constants";

interface FinanceInput {
  category: string;
  amount: number;
  frequency: string;
}

const defaultState = {
  income: [
    {
      category: "Salary",
      amount: 5000,
      frequency: "month",
    },
  ] as FinanceInput[],
  expenses: [] as FinanceInput[],
};

const savedState = localStorage.getItem('financials');

const initialState = savedState ? JSON.parse(savedState) : defaultState;

export const financesSlice = createSlice({
  name: "financials",
  initialState,
  reducers: {
    addIncome: (state) => {
      state.income.push({ category: "", amount: 0, frequency: "" });
    },
    addExpense: (state) => {
      state.expenses.push({ category: "", amount: 0, frequency: "" });
    },
    editInput: (state, action) => {
      const { itemKey, type, item } = action.payload;
      if (type === constants.TYPE_INCOME) {
        state.income = state.income.map((incomeItem: FinanceInput, index: number) => 
          index === itemKey ? item : incomeItem
        );
      } else if (type === constants.TYPE_EXPENSE) {
        state.expenses = state.expenses.map((expenseItem: FinanceInput, index: number) => 
          index === itemKey ? item : expenseItem
        );
      }
    },
    removeInput: (state, action) => {
      const { itemKey, type } = action.payload;
      if (type === constants.TYPE_INCOME) {
        state.income = state.income.filter((_: FinanceInput, index: number) => index !== itemKey);
      } else if (type === constants.TYPE_EXPENSE) {
        state.expenses = state.expenses.filter((_: FinanceInput, index: number) => index !== itemKey);
      }
    },
    saveToLocalStorage: (state) => {
      localStorage.setItem('financials', JSON.stringify(state));
    },
  },
});

export const { addIncome, addExpense, saveToLocalStorage } = financesSlice.actions;

export default financesSlice.reducer;
