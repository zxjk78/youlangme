import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const API_URL = 'http://127.0.0.1:8080/';
const user = JSON.parse(localStorage.getItem('user'));
const accessToken = user ? user.accessToken : null;


const initialState = {
  isFollowed: false
};

export const follow = createAsyncThunk(
  'followed',
  async (userId, thunkAPI) => {
    console.log('팔로우 들어옴')
    const postConfig = {
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': accessToken,
      },
    };
    try {
      console.log('팔로우 시작')
      const response = await axios.post(
        API_URL + `follow/${userId}`, {},
        postConfig
      );
      return response.data.data;
    } catch (error) {
      console.log('팔로우 요청 에러')
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const unfollow = createAsyncThunk(
'unfollowed',
async (userId, thunkAPI) => {
  const deleteConfig = {
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': accessToken,
    },
  };
  try {
    const response = await axios.delete(
      API_URL + `follow/${userId}`,
      deleteConfig
    );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
}
);


const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    
  },
  extraReducers: {
    //     // pending, fulfilled, rejected 는 비동기 처리 시의 프로미스 상태이다.
    [follow.fulfilled]: (state) => {
      state.isFollowed = true;
    },
    [follow.rejected]: (state) => {
      state.isFollowed = false;
    },
    [unfollow.fulfilled]: (state) => {
      state.isFollowed = false;
    },
    [unfollow.rejected]: (state) => {
      state.isFollowed = true;
    },
}});

export const profileActions = ProfileSlice.actions;
export default ProfileSlice.reducer;

