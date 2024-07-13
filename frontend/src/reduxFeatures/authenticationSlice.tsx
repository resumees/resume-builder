import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setAuthentication: (state, action: PayloadAction<boolean>) => {
      console.log(action);
      state.isAuthenticated = action.payload;
    }
  },
});

export const { setAuthentication } = authenticationSlice.actions;

export default authenticationSlice.reducer;