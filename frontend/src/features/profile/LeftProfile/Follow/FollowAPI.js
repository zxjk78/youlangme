import axios from 'axios';
import { API_URL } from '../../../../common/api/http-config';
// const config = {
//   headers: { "Content-Type": "application/json" },
// };
// const user = JSON.parse(localStorage.getItem('user'));
// const accessToken = user ? user.accessToken : null;
// const getConfig = { headers: { 'X-Auth-Token': accessToken } };

// const API_URL = 'http://127.0.0.1:8080/';
// 리덕스랑 관련없는 서버 통신 API들 모음



export const fetchFollowCnt =  async (userId) =>  {
  const user = JSON.parse(localStorage.getItem('user'));
  const accessToken = user ? user.accessToken : null;
  const getConfig = { headers: { 'X-Auth-Token': accessToken } };
  try {
    const response = await axios.get(
      API_URL + `follow/follower-followee-cnt/${userId}`,
      // 엑세스 토큰이 필요하다.
      getConfig
    );

    return response.data.data



  } catch (err) {
    console.log('팔로우 에러')
    return err.response;
  }
};


// followers 배열 받아오기
export const fetchFollowers =  async (userId) =>  {
  const user = JSON.parse(localStorage.getItem('user'));
  const accessToken = user ? user.accessToken : null;
  const getConfig = { headers: { 'X-Auth-Token': accessToken } };
  try {
    const response = await axios.get(
      API_URL + `follow/followers/${userId}`,
      // 엑세스 토큰이 필요하다.
      getConfig
      );
      return response.data.data;

      // if (response.data.data.find(flwer=>flwer.followerId == currentUserId)){ 
      //   console.log('dddddddddd')
      //   return true
      //   // setIsFollow(true)
      // } else {
      //   return false
      // }

  } catch (err) {
    console.log('팔로워 리스트 fetch 에러')
    return err.response;
  }
};

// followees 배열 받아오기
export const fetchFollowees = async (userId) =>  {
    const user = JSON.parse(localStorage.getItem('user'));
    const accessToken = user ? user.accessToken : null;
    const getConfig = { headers: { 'X-Auth-Token': accessToken } };
    try {
      const response = await axios.get(
        API_URL + `follow/followees/${userId}`,
        // 엑세스 토큰이 필요하다.
        getConfig
      );
      // console.log(response.data.data)
      
      return response.data.data;
  
  
    } catch (err) {
      console.log('팔로잉 리스트 fetch 에러')
      return err.response;
    }
  };



export const fetchFollowOrNot = async (userId, currentUserId) =>  {
  const user = JSON.parse(localStorage.getItem('user'));
  const accessToken = user ? user.accessToken : null;
  const getConfig = { headers: { 'X-Auth-Token': accessToken } };
  try {
    const response = await axios.get(
      API_URL + `follow/followers/${userId}`,
      // 엑세스 토큰이 필요하다.
      getConfig
    );
    console.log(response.data.data)
    if (response.data.data.find(flwer=>flwer.followerId === currentUserId)){ 
        // console.log('팔로우 하고 있음. ');
        return true } else {
          return false
          // console.log('팔로우 하고 있지 않음. ');
        }
    
  } catch (err) {
    console.log('팔로우 하고 잇는지 아닌지 fetch 에러')
    return err.response;
  }
};


// follow 요청
export const sendFollow =  async (userId) =>  {
  const user = JSON.parse(localStorage.getItem('user'));
  const accessToken = user ? user.accessToken : null;
  const getConfig = { headers: { 'X-Auth-Token': accessToken } };   
  console.log('팔로우 버튼 클릭');

  try {
    await axios.post(
      API_URL + `follow/${userId}`, {},
      getConfig 
    );
    // console.log(response.data.message)
    return true;

  } catch (err) {
    console.log('팔로우 요청 에러')
    return err.response;
  }
};

// unfollow 요청
export const sendUnfollow =  async ( userId) =>  {
  const user = JSON.parse(localStorage.getItem('user'));
  const accessToken = user ? user.accessToken : null;
  const getConfig = { headers: { 'X-Auth-Token': accessToken } };  
  console.log('언팔로우 버튼 클릭');

  try {
    await axios.delete(
      API_URL + `follow/${userId}`,
      getConfig 
    );
    // console.log(response.data.message)
    return false;

  } catch (err) {
    console.log('언팔로우 요청 에러')
    return err.response;
  }
};