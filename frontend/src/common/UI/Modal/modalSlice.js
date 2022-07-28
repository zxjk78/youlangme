import { createSlice } from '@reduxjs/toolkit';

const modalState = {
  isVisible: false,
  backDropClickClose: true,
  backDropTransparent: false,
};

const reducer = {
  offModal(state) {
    state.isVisible = false;
  },
  // modal backdrop을 보이게 만들 것인지 아닌지
  // modal의 바깥을 클릭했을 때 사라지게 할 것인지 아닌지,
  // action에 담아서 보내도록 만듬, 아무값도 안보내면 true
  onModal(state, action) {
    // console.log('here');
    const option = action.payload;
    state.isVisible = true;
    state.backDropClickClose = option?.backDropClickClose || true;
    state.backDropTransparent = option?.backDropTransparent || false;
  },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState: modalState,
  reducers: reducer,
});

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;
