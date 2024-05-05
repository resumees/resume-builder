import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ComparisonState {
  electricity: Electricity;
  phone: Phone;
  mortgage: Mortgage;
  gas: Gas;
}

interface Electricity {
  postcode: string | null;
}

interface Phone {}

interface Mortgage {}

interface Gas {
  postcode: string | null;
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
  },
});

export const { addPostcode } = comparisonSlice.actions;

export default comparisonSlice.reducer;
