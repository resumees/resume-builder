// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import financesSlice from './reduxFeatures/finances/financesSlice';

export const store = configureStore({
  reducer: {
    financials: financesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;