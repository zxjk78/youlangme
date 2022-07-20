import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";

const reducer = combineReducers({
  auth: authSlice.reducer,
});

const store = configureStore({
  reducer: reducer,
});

export default store;
