import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const config = {
//   headers: { "Content-Type": "application/json" },
// };
const API_URL = 'http://127.0.0.1:8080/';

const initState = {
  isNameUnique: false,
  name: '',
  nationality: '',
  gender: '',
  birthday: { birthYear: '2000', birthMonth: '01', birthDay: '01' },
  myLanguage: '',
  yourLanguage: '',
  favoriteList: [], // favorite : DB에서 받아서 렌더링
};

// 직렬화 오류 non-serial 어쩌고: 견본 코드가 response를 그대로 보내는데 이게 직렬화가 안되서 벌어지는 문제였음
// response.data로 보냄
export const nameDupCheck = createAsyncThunk(
  'Modify/nickname_check',
  async (name, thunkAPI) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const accessToken = user ? user.accessToken : null;
    const getConfig = { headers: { 'X-Auth-Token': accessToken } };

    try {
      const response = await axios.get(
        API_URL + `user/check-name/?name=${name}`,
        // 엑세스 토큰이 필요하다.
        getConfig
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

export const dispatchUserBasicInfo = createAsyncThunk(
  'Modify/dispatch_userInfo',
  async (userBasicInfo, thunkAPI) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const accessToken = user ? user.accessToken : null;
    const postConfig = {
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': accessToken,
      },
    };

    try {
      const response = await axios.post(
        API_URL + 'user/basic-info',
        JSON.stringify(userBasicInfo),
        postConfig
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// form 데이터를 굳이 리덕스에서 다룰 필요는 없음. 시간 남으면 리팩토링 ㄱㄱ

const reducers = {
  setIsNameUnique(state, action) {
    state.isNameUnique = action.payload;
  },

  setName(state, action) {
    state.name = action.payload;
  },
  setNationality(state, action) {
    state.nationality = action.payload;
  },
  setGender(state, action) {
    state.gender = action.payload;
  },
  setBirthday(state, action) {
    state.birthday = action.payload;
  },
  setMyLang(state, action) {
    state.myLanguage = action.payload;
  },
  setYourLang(state, action) {
    state.yourLanguage = action.payload;
  },

  addFavorite(state, action) {
    state.favoriteList.push(action.payload);
  },
  removeFavorite(state, action) {
    state.favoriteList = state.favoriteList.filter(
      (item) => item !== action.payload
    );
  },
};

const modifySlice = createSlice({
  name: 'modify',
  initialState: initState,
  reducers: reducers,
  extraReducers: {
    // pending, fulfilled, rejected 는 비동기 처리 시의 프로미스 상태이다.
    [nameDupCheck.fulfilled]: (state, action) => {
      const isDup = action.payload.data;
      state.isNameUnique = !isDup;
    },

    [dispatchUserBasicInfo.fulfilled]: (state, action) => {
      state.isNameUnique = false;
      state.name = '';
      state.nationality = '';
      state.gender = '';
      state.birthday = { birthYear: '2000', birthMonth: '01', birthDay: '01' };
      state.myLanguage = '';
      state.yourLanguage = '';
      state.favoriteList = [];
    },
    [dispatchUserBasicInfo.rejected]: (state, action) => {
      state.isNameUnique = false;
      state.name = '';
      state.nationality = '';
      state.gender = '';
      state.birthday = { birthYear: '2000', birthMonth: '01', birthDay: '01' };
      state.myLanguage = '';
      state.yourLanguage = '';
      state.favoriteList = [];
    },
  },
});
// 일반 reducer는 actions로 export, thunk는 위에서 export하는 나름의 규칙?
// 코드 더 치게 되는데 생각 좀 해봐야 할듯
export const modifyActions = modifySlice.actions;

export default modifySlice.reducer;
