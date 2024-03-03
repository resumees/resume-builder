import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import constants from "../constants";

interface FinanceInput {
  id: string;
  category: string;
  amount: number;
  frequency: number;
}

interface FinancialsState {
  income: FinanceInput[];
  expenses: FinanceInput[];
  totalIncome: number;
  totalExpense: number;
}

interface RootState {
  financials: FinancialsState;
}

const defaultState = {
  income: [
    {
      id: uuidv4(),
      category: "Salary",
      amount: 0,
      frequency: 1,
    },
  ] as FinanceInput[],
  expenses: [] as FinanceInput[],
  totalIncome: 0,
  totalExpense: 0,
};

const savedState = localStorage.getItem("financials");

const initialState = savedState ? JSON.parse(savedState) : defaultState;

export const financesSlice = createSlice({
  name: "financials",
  initialState,
  reducers: {
    addIncome: (state) => {
      state.income.push({
        id: uuidv4(),
        category: "",
        amount: 0,
        frequency: 1,
      });
    },
    addExpense: (state) => {
      state.expenses.push({
        id: uuidv4(),
        category: "",
        amount: 0,
        frequency: 1,
      });
    },
    editInput: (state, action) => {
      const { id, type, item } = action.payload;
      if (type === constants.TYPE_INCOME) {
        state.income = state.income.map((incomeItem: FinanceInput) =>
          incomeItem.id === id ? { ...incomeItem, ...item } : incomeItem
        );
        state.totalIncome = state.income.reduce(
          (total: number, incomeItem: FinanceInput) =>
            total + incomeItem.amount * incomeItem.frequency,
          0
        );
      } else if (type === constants.TYPE_EXPENSE) {
        state.expenses = state.expenses.map((expenseItem: FinanceInput) =>
          expenseItem.id === id ? { ...expenseItem, ...item } : expenseItem
        );
        state.totalExpense = state.expenses.reduce(
          (total: number, expenseItem: FinanceInput) =>
            total + expenseItem.amount * expenseItem.frequency,
          0
        );
      }
    },
    removeInput: (state, action) => {
      const { id, type, item } = action.payload;
      if (type === constants.TYPE_INCOME) {
        state.income = state.income.filter(
          (incomeItem: FinanceInput) => incomeItem.id !== id
        );
        state.totalIncome -= item.amount * item.frequency;
      } else if (type === constants.TYPE_EXPENSE) {
        state.expenses = state.expenses.filter(
          (expenseItem: FinanceInput) => expenseItem.id !== id
        );
        state.totalExpense -= item.amount * item.frequency;
      }
    },
    saveToLocalStorage: (state) => {
      localStorage.setItem("financials", JSON.stringify(state));
    },
    setFinancialsState: (state, action: PayloadAction<FinancialsState>) => {
      state.income = action.payload.income;
      state.expenses = action.payload.expenses;
      state.totalIncome = action.payload.totalIncome;
      state.totalExpense = action.payload.totalExpense;
      if (!localStorage.getItem('financials')) {
        localStorage.setItem('financials', JSON.stringify(state));
      }
    },
  },
});

export const { addIncome, addExpense, saveToLocalStorage, setFinancialsState } =
  financesSlice.actions;

export default financesSlice.reducer;
