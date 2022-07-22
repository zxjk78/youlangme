import { createSlice } from '@reduxjs/toolkit';

const modalState = {
  isVisible: false,
  backDropClickClose: true,
};

const reducer = {
  offModal(state) {
    state.isVisible = false;
  },
  // modal의 검은 바탕을 클릭했을 때 사라지게 할 것인지 아닌지를
  // action에 담아서 보내도록 만듬, 아무값도 안보내면 true
  onModal(state, action) {
    console.log(action);
    console.log(action.payload);
    state.isVisible = true;
    state.backDropClickClose =
      typeof action.payload !== 'undefined' ? action.payload : true;
  },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState: modalState,
  reducers: reducer,
});

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;
