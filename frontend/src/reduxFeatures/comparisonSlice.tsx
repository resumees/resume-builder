import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ComparisonState {
  postcode: string | null;
}

const initialState: ComparisonState = {
  postcode: null,
};

export const comparisonSlice = createSlice({
  name: 'comparison',
  initialState,
  reducers: {
    addPostcode: (state, action: PayloadAction<string>) => {
      state.postcode = action.payload;
    },
    clearPostcode: (state) => {
      state.postcode = null;
    },
  },
});

export const { addPostcode, clearPostcode } = comparisonSlice.actions;

export default comparisonSlice.reducer;
