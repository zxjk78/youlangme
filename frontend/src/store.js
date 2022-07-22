import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
// 나는 reducer를 default로 export 함
import modifyReducer from './features/auth/modify/modifySlice';
import modalReducer from './common/UI/Modal/modalSlice';
const reducer = combineReducers({
  auth: authSlice.reducer,
  modify: modifyReducer,
  modal: modalReducer,
});

const store = configureStore({
  reducer: reducer,
});

export default store;
