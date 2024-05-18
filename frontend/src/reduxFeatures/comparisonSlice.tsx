import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ComparisonState {
  electricity: ElectricityParams;
  phone: PhoneParams;
  mortgage: MortgageParams;
  gas: GasParams;
  search: {
    isSearching: boolean;
  };
}

export interface ElectricityParams {
  postcode?: string | null;
}

export interface MortgageParams {
  loanAmount?: string | null;
  loanPurpose?: string | null;
  repaymentType?: string | null;
  interestRateType?: string | null;
}

export interface GasParams {
  postcode?: string | null;
}

export interface PhoneParams {
  planType: string | null;
  monthlyData: string | null;
}

const initialState: ComparisonState = {
  electricity: {
    postcode: null,
  },
  phone: {
    planType: "Sim only",
    monthlyData: "500MB+",
  },
  mortgage: {
    loanAmount: "",
    loanPurpose: "Buying next home",
    repaymentType: "Principal & Interest",
    interestRateType: "Variable",
  },
  gas: {
    postcode: null,
  },
  search: {
    isSearching: false,
  },
};

export const comparisonSlice = createSlice({
  name: "comparison",
  initialState,
  reducers: {
    addPostcode: (
      state,
      action: PayloadAction<ElectricityParams | GasParams>
    ) => {
      state.electricity = action.payload;
      state.gas = action.payload;
    },
    addMortgageSearch: (state, action: PayloadAction<MortgageParams>) => {
      state.mortgage = action.payload;
    },
    addPhoneSearch: (state, action: PayloadAction<PhoneParams>) => {
      state.phone = action.payload;
    },
    searchBoxParams: (state, action: PayloadAction<boolean>) => {
      state.search.isSearching = action.payload;
    },
  },
});

export const {
  addPostcode,
  addMortgageSearch,
  searchBoxParams,
  addPhoneSearch,
} = comparisonSlice.actions;

export default comparisonSlice.reducer;
