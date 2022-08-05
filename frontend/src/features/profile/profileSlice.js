import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


import { API_URL, user, accessToken  } from '../../common/api/http-config';

// const API_URL = 'http://127.0.0.1:8080/';
// const user = JSON.parse(localStorage.getItem('user'));
// const accessToken = user ? user.accessToken : null;

const initialState = {
  isProfileImgUpdated: false,
  // myProfileImg: 
};

// export const profileImgUpdate = createAsyncThunk(
//     'profileImageUpdate',  
//     async (uploadedProfileImg, thunkAPI) => {
//     console.log('My 프로필 이미지 업데이트')  

//     const putConfig = {
//       headers: {
//         'X-Auth-Token': accessToken,
//         'Content-Type': 'multipart/form-data',
//       },
//     };
//     try {
//       if (uploadedProfileImg) {
//         console.log('My 프로필 이미지 업뎃 시작')  
//         const formData = new FormData();
//         formData.append('imageFile', uploadedProfileImg);
//         const res = await axios.put(
//           API_URL + `user/image`,
//           formData,
//           // 엑세스 토큰이 필요하다.
//           putConfig
//         );
//         alert('프로필 사진이 등록되었습니다!');
//         // const previewImageURL = URL.createObjectURL(uploadedProfileImg);
//         return res;
//         // setUploadedProfileImg({
//         //   profileImageFile: '',
//         // });
//       }
//     } catch (err) {
//       console.log('프사 업뎃 에러', err);
//       alert('사진을 등록하세요!');
//       return thunkAPI.rejectWithValue(err.message);
//     }
//   }
// );


const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // profileImgUpdate
    profileImgUpdate(state) {
      state.isProfileImgUpdated = true;
      // state.isProfileImgupdated = action.payload;
      // console.log('action payload 는', action.payload)
    },

    resetProfileImgUpdate(state) {
      state.isProfileImgUpdated = false;
    }
  },
  // extraReducers: {
  //   //     // pending, fulfilled, rejected 는 비동기 처리 시의 프로미스 상태이다.
  //   [profileImgUpdate.fulfilled]: (state, action) => {
  //     // console.log('리덕스 페이로드 fulfilled 될때 넘어오는거 :',action.payload)
  //     state.isProfileImgUpdated= true;
  //   },
  //   [profileImgUpdate.rejected]: (state) => {
  //     state.isProfileImgUpdated= false;
  //   },

  //   },
});

export const profileActions = ProfileSlice.actions;
export default ProfileSlice.reducer;




// export const unfollow = createAsyncThunk(
// 'unfollowed',  
// async (userId, thunkAPI) => {
//   const deleteConfig = {
//     headers: {
//       'Content-Type': 'application/json',  
//       'X-Auth-Token': accessToken,
//     },
//   };
//   try {
//     const response = await axios.delete(
//       API_URL + `follow/${userId}`,  
//       deleteConfig
//     );
//     return response.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.message);  
//   }
// }
// );

