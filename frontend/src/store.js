import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
// 나는 reducer를 default로 export 함
import modifyReducer from "./features/auth/modify/modifySlice";

const reducer = combineReducers({
  auth: authSlice.reducer,
  modify: modifyReducer,

});

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
