import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
// 나는 reducer를 default로 export 함
import modifyReducer from './features/auth/modify/modifySlice';
import modalReducer from './common/UI/Modal/modalSlice';
import boardReducer from './features/board/boardSlice';
import createBoardReducer from './features/board/create/createBoardSlice';
const reducer = combineReducers({
  //auth
  auth: authSlice.reducer,
  modify: modifyReducer,
  //ui
  modal: modalReducer,
  //board
  board: boardReducer,
  createBoard: createBoardReducer,
});

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
