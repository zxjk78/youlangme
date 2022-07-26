import { createSlice } from '@reduxjs/toolkit';

const boardState = {};

const reducer = {};

const boardSlice = createSlice({
  name: 'board',
  initialState: boardState,
  reducers: reducer,
});

export const boardActions = boardSlice.actions;
export default boardSlice.reducer;
