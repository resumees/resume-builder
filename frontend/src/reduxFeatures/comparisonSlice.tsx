import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ComparisonState {
  electricity: ElectricityParams;
  phone: PhoneParams;
  mortgage: MortgageParams;
  gas: GasParams;
  internet: InternetParams;
  search: {
    isSearching: boolean;
  };
}

export interface ElectricityParams {
  postcode?: string | null;
  selectedElectricity?: object
}

export interface MortgageParams {
  loanAmount?: string | null;
  loanPurpose?: string | null;
  repaymentType?: string | null;
  interestRateType?: string | null;
  selectedMortgage?: object;
}

export interface GasParams {
  postcode?: string | null;
  selectedGas?: object;
}

export interface InternetParams {
  internetType: string | null;
  speedTier: string | null;
}

export interface PhoneParams {
  planType: string | null;
  monthlyData: string | null;
  selectedPhone?: object;
}

const initialState: ComparisonState = {
  electricity: {
    postcode: null,
    selectedElectricity: {}
  },
  phone: {
    planType: "Sim only",
    monthlyData: "500MB+",
    selectedPhone: {}
  },
  mortgage: {
    loanAmount: "",
    loanPurpose: "Buying next home",
    repaymentType: "Principal & Interest",
    interestRateType: "Variable",
    selectedMortgage: {}
  },
  gas: {
    postcode: null,
    selectedGas: {}
  },
  internet: {
    internetType: "NBN",
    speedTier: "Standard",
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
    selectMortgage: (state, action) => {
      state.mortgage.selectedMortgage = action.payload;
    },
    addPhoneSearch: (state, action: PayloadAction<PhoneParams>) => {
      state.phone = action.payload;
    },
    selectPhone: (state, action) => {
      state.phone.selectedPhone = action.payload;
    },
    selectGas: (state, action) => {
      state.gas.selectedGas = action.payload;
    },
    selectElectricity: (state, action) => {
      state.electricity.selectedElectricity = action.payload;
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
  selectMortgage,
  selectPhone,
  selectGas,
  selectElectricity
} = comparisonSlice.actions;

export default comparisonSlice.reducer;
