import { combineReducers, configureStore } from '@reduxjs/toolkit';
import financesSlice from './reduxFeatures/financesSlice';
import authenticationSlice from './reduxFeatures/authenticationSlice';
import comparisonSlice from './reduxFeatures/comparisonSlice';

const rootReducer = combineReducers({
  global: combineReducers({
    authentication: authenticationSlice,
    financials: financesSlice,
    comparison: comparisonSlice,
  }),
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;