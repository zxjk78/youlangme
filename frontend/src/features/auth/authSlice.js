import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

import { API_URL, getConfig } from "../../common/api/http-config";

// const config = {
//   headers: { "Content-Type": "application/json" },
// };

export const login = createAsyncThunk("LOGIN", async (userInfo, thunkAPI) => {
  try {
    const response = await axios.post(API_URL + "login", userInfo);
    localStorage.setItem("user", JSON.stringify(response.data.data));
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue();
  }
});

export const signup = createAsyncThunk("SIGNUP", async (userInfo, thunkAPI) => {
  try {
    const response = await axios.post(API_URL + "signup", userInfo);
    return response;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const logout = createAsyncThunk("LOGOUT", async (thunkAPI) => {
  const user = JSON.parse(localStorage.getItem("user"));
  let accessToken = user ? user.accessToken : null;
  try {
    const response = await axios.delete(API_URL + "log-out", {
      headers: { "X-Auth-Token": accessToken },
    });
    window.localStorage.clear();
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const getUser = createAsyncThunk("GETUSER", async (thunkAPI) => {
  const user = JSON.parse(localStorage.getItem("user"));
  let accessToken = user ? user.accessToken : null;
  try {
    const response = await axios.get(API_URL + "user/login-user", {
      headers: { "X-Auth-Token": accessToken },
    });
    localStorage.setItem("currentUser", JSON.stringify(response.data.data));
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

const initialState = { isLoggedIn: false, accessToken: "", currentUser: {} };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login,
    signup,
    logout,
    socialLogin(state) {
      return { ...state, isLoggedIn: true };
    },
    getUser,
    modifyUser(state, action) {
      state.currentUser = { ...action.payload.data };
    },
  },
  extraReducers: {
    [signup.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [signup.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.accessToken = action.payload.data.accessToken;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.currentUser = {};
      state.accessToken = "";
    },
    [getUser.fulfilled]: (state, action) => {
      state.currentUser = { ...action.payload.data };
      state.isLoggedIn = true;
    },
    [getUser.rejected]: (state, action) => {
      state.currentUser = {};
    },
  },
});
export let { socialLogin } = authSlice.actions;
export let { modifyUser } = authSlice.actions;
export default authSlice;
