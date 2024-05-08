import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ComparisonState {
  electricity: Electricity;
  phone: Phone;
  mortgage: Mortgage;
  gas: Gas;
}

interface Electricity {
  postcode?: string | null;
}

interface Phone {}

interface Mortgage {
  loanAmount?: string | null;
}

interface Gas {
  postcode?: string | null;
}

const initialState: ComparisonState = {
  electricity: {
    postcode: null,
  },
  phone: {},
  mortgage: {},
  gas: {
    postcode: null,
  },
};

export const comparisonSlice = createSlice({
  name: "comparison",
  initialState,
  reducers: {
    addPostcode: (state, action: PayloadAction<Electricity>) => {
      state.electricity = action.payload;
      state.gas = action.payload;
    },
    addLoanAmountMortgage: (state, action: PayloadAction<Mortgage>) => {
      state.mortgage = action.payload;
    },
  },
});

export const { addPostcode, addLoanAmountMortgage } = comparisonSlice.actions;

export default comparisonSlice.reducer;
