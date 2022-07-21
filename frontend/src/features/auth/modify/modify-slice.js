import axios from 'axios';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const config = {
//   headers: { "Content-Type": "application/json" }, 
// };
const API_URL = "http://127.0.0.1:8080/";
const user = JSON.parse(localStorage.getItem("user"));
const accessToken = user.accessToken;


const initState = {
    isNameUnique: false,
    name: '',
    nationality: '',
    gender: '',
    birthday: { birthYear: '2000',  birthMonth: '01', birthDay:'01' },
    myLanguage: '',
    yourLanguage: '',
    favoriteList: [], // favorite : DB에서 받아서 렌더링
}

export const nameDupCheck = createAsyncThunk("CHECK_NICKNAME_DUP", async (name, thunkAPI) => {
  try {
    const response = await axios.get(API_URL + `user/check-name/?name=${name}`,
    {headers:{      
      'X-Auth-Token': accessToken
    }}
    );
    return response;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response);
  }
});

export const dispatchUserBasicInfo = createAsyncThunk('DISPATCH_USER_INFO', async (userBasicInfo, thunkAPI)=> {
  try {
    const response = await axios.post(API_URL + 'user/basic-info',
    JSON.stringify(userBasicInfo),
    {headers:{
      "Content-Type": "application/json",
      'X-Auth-Token': accessToken
    }}
    // {...config, 'X-Auth-Token': accessToken}
    );
    return response;
  } catch(error) {
    return thunkAPI.rejectWithValue(error.message)
  }
});



const reducers = {
  setIsNameUnique(state, action) {
    state.isNameUnique = action.payload
  },

  setName(state, action) {
    state.name = action.payload
  },
  setNationality(state, action) {
    state.nationality = action.payload

  },
  setGender(state, action) {
    state.gender = action.payload

  },
  setBirthday(state, action) {
    state.birthday = action.payload

  },
  setMyLang(state, action) {
    state.myLanguage = action.payload

  },
  setYourLang(state, action) {
    state.yourLanguage = action.payload

  },
  
  addFavorite(state, action) {
    state.favoriteList.push(action.payload)
    
  },
  removeFavorite(state, action) {
    state.favoriteList = state.favoriteList.filter(item => item !== action.payload)
  },

}


const modifySlice = createSlice({
  name: 'modify',
  initialState: initState,
  reducers: reducers,
  extraReducers:{
    [nameDupCheck.fulfilled]: (state, action) => {
      const isDup = action.payload.data.data
      
      state.isNameUnique = !isDup
      
    },
  }
})
// 일반 reducer는 action에, thunk는 그냥 export
export const modifyActions = modifySlice.actions;

export default modifySlice.reducer;