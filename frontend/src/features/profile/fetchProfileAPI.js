import axios from 'axios';
import { useCallback } from 'react';


// const config = {
//   headers: { "Content-Type": "application/json" },
// };
const user = JSON.parse(localStorage.getItem('user'));

const API_URL = 'http://127.0.0.1:8080/';
// 리덕스랑 관련없는 서버 통신 API들 모음


export const fetchProfile =  async (setProfileData, userId) =>  {
    
    console.log('fetch 프로필');
    const accessToken = user ? user.accessToken : null;
    const getConfig = { headers: { 'X-Auth-Token': accessToken } };

    try {
      const response = await axios.get(
        API_URL + `user/profile/${userId}`,
        // 엑세스 토큰이 필요하다.
        getConfig
      );
      // console.log(response.data.data)
      setProfileData(
        response.data.data
      );
      console.log(response.data.data)

    } catch (err) {
      console.log('에러')
      return err.response;
    }

    
    
    
  };