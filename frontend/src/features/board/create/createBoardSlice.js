import { createSlice } from '@reduxjs/toolkit';

const createBoardState = {
  // 이미지 파일 갯수 관리 위한 state
  loadedImgFileCnt: 0,
};

const reducer = {
  clearFile(state) {
    state.loadedImgFileCnt = 0;
  },
  addFileCnt(state, action) {
    if (action.payload === undefined) {
      state.loadedImgFileCnt += 1;
    } else {
      state.loadedImgFileCnt += action.payload;
    }
  },
  removeFileCnt(state) {
    state.loadedImgFileCnt -= 1;
  },
};

const createBoardSlice = createSlice({
  name: 'board',
  initialState: createBoardState,
  reducers: reducer,
});

export const createBoardActions = createBoardSlice.actions;
export default createBoardSlice.reducer;
