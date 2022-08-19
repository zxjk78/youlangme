import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, accessToken } from '../../common/api/http-config';

const header = {
  'Content-Type': 'application/json',
  'X-Auth-Token': accessToken,
};
// const config = {
//   headers: { "Content-Type": "application/json" },
// };

export const startMatching = createAsyncThunk(
  'startmatching',
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await axios.post(API_URL + 'match', data, {
        headers: header,
      });
      console.log(response.data.data);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

const initialState = { opponentId: null, sessionId: null };

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    startMatching,
    resetMatching(state) {
      state.sessionId = null;
      state.opponentId = null;
    },
  },
  extraReducers: {
    [startMatching.fulfilled]: (state, action) => {
      state.opponentId = action.payload.opponentId;
      state.sessionId = action.payload.sessionId;
    },
  },
});

export let { resetMatching } = matchSlice.actions;
export default matchSlice;
