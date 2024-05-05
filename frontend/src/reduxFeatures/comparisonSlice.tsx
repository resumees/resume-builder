import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ComparisonState {
  electricity: Electricity,
  phone: Phone,
  mortgage: Mortgage,
}

interface Electricity {
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
  electricity: {
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
    addPostcode: (state, action: PayloadAction<Electricity>) => {
      state.electricity = action.payload;
    }
  },
});


export const { addPostcode } = comparisonSlice.actions;

export default comparisonSlice.reducer;
