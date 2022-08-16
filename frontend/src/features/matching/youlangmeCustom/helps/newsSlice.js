import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  newsURL: '',
};
const NewsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    shareNews(state, action) {
      state.newsURL = action.payload;
    },
  },
});

export const newsActions = NewsSlice.actions;
export default NewsSlice.reducer;
