import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authenticationSlice from './reduxFeatures/authenticationSlice';

const rootReducer = combineReducers({
  global: combineReducers({
    authentication: authenticationSlice,
  }),
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;