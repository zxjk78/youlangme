import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const config = {
//   headers: { "Content-Type": "application/json" },
// };
const API_URL = "http://127.0.0.1:8080/";
const user = JSON.parse(localStorage.getItem("user"));
const accessToken = user ? user.accessToken : null;
const getConfig = { headers: { 'X-Auth-Token': accessToken } };
const currentUser = {name: null}

export const login = createAsyncThunk("LOGIN", async (userInfo, thunkAPI) => {
  try {
    const response = await axios.post(API_URL + "login/", userInfo);
    console.log(response);
    localStorage.setItem("user", JSON.stringify(response.data.data));
    const response1 = await axios.get(API_URL + "user/login-user",{ headers: { 'X-Auth-Token': response.data.data.accessToken } })
    return response1.data
    }
    catch (err) {
    return thunkAPI.rejectWithValue();
  }
});

export const signup = createAsyncThunk("SIGNUP", async (userInfo, thunkAPI) => {
  try {
    const response = await axios.post(API_URL + "signup/", userInfo);
    return response;
  } catch (err) {
    return thunkAPI.rejectWithValue();
  }
});

export const logout = createAsyncThunk("LOGOUT", async () => {
  localStorage.removeItem("user");
  return { isLoggedIn: true, user, currentUser: {name:null} }
});

export const getUser = createAsyncThunk("GETUSER", async (thunkAPI)=> {
  try{
    const response = await axios.get(API_URL + "user/login-user", getConfig)
    return response.data
  } catch(err){
    return thunkAPI.rejectWithValue()
  }
})

const initialState = currentUser
  ? { isLoggedIn: true, currentUser }
  : { isLoggedIn: false,  currentUser: {name: null} };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login,
    signup,
    logout,
    socialLogin(state) {
      return { isLoggedIn: true, user, currentUser };
    },
    getUser
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
      state.currentUser = action.payload.data
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.currentuser = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.currentUser = {name: null}
    },
    [getUser.fulfilled] : (state, action) => {
      state.currentUser = action.payload.data
      state.isLoggedIn = true
    },
    [getUser.rejected] : (state, action) => {
      state.currentUser = null
    }
  },
});
export let { socialLogin } = authSlice.actions;
export default authSlice;