import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ComparisonState {
  utility: Utility,
  phone: Phone,
  mortgage: Mortgage,
}

interface Utility {
  postcode: string | null;
  electricity: boolean;
  gas: boolean;
  solar: boolean;
}

interface Phone {
}

interface Mortgage{
}

const initialState: ComparisonState = {
  utility: {
    postcode: null,
    electricity: false,
    gas: false,
    solar: false
  },
  phone: {
  },
  mortgage: {
  }
};

export const comparisonSlice = createSlice({
  name: 'comparison',
  initialState,
  reducers: {
    addPostcode: (state, action: PayloadAction<Utility>) => {
      state.utility = action.payload;
    },
    clearPostcode: (state) => {
      state.utility = { ...state.utility, postcode: null };
    },
  },
});


export const { addPostcode, clearPostcode } = comparisonSlice.actions;

export default comparisonSlice.reducer;
