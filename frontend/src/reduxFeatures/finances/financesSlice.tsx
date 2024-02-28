import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import constants from "../../constants";

interface FinanceInput {
  id: string;
  category: string;
  amount: number;
  frequency: string;
}

const defaultState = {
  income: [
    {
      id: uuidv4(),
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
      state.income.push({ id: uuidv4(), category: "", amount: 0, frequency: "" });
    },
    addExpense: (state) => {
      state.expenses.push({ id: uuidv4(), category: "", amount: 0, frequency: "" });
    },
    editInput: (state, action) => {
      const { id, type, item } = action.payload;
      if (type === constants.TYPE_INCOME) {
        state.income = state.income.map((incomeItem: FinanceInput) => 
          incomeItem.id === id ? { ...incomeItem, ...item } : incomeItem
        );
      } else if (type === constants.TYPE_EXPENSE) {
        state.expenses = state.expenses.map((expenseItem: FinanceInput) => 
          expenseItem.id === id ? { ...expenseItem, ...item } : expenseItem
        );
      }
    },
    removeInput: (state, action) => {
      const { id, type } = action.payload;
      console.log("hello", id, type, state.income);
      if (type === constants.TYPE_INCOME) {
        state.income = state.income.filter((incomeItem: FinanceInput) => incomeItem.id !== id);
        console.log(state.income)
      } else if (type === constants.TYPE_EXPENSE) {
        state.expenses = state.expenses.filter((expenseItem: FinanceInput) => expenseItem.id !== id);
      }
    },
    saveToLocalStorage: (state) => {
      localStorage.setItem('financials', JSON.stringify(state));
    },
  },
});

export const { addIncome, addExpense, saveToLocalStorage } = financesSlice.actions;

export default financesSlice.reducer;
