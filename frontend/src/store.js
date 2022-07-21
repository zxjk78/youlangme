import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import modifyReducer from "./features/auth/modify/modify-slice";

const reducer = combineReducers({
  auth: authSlice.reducer,
  modify: modifyReducer,

});

const store = configureStore({
  reducer: reducer,
});

export default store;
