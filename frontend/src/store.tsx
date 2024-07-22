import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authenticationSlice from './reduxFeatures/authenticationSlice';
import campaignSlice from "./reduxFeatures/campaignSlice";

const rootReducer = combineReducers({
  global: combineReducers({
    authentication: authenticationSlice,
    campaigns: campaignSlice,
  }),
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;