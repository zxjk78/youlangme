import axios from 'axios';


// const config = {
//   headers: { "Content-Type": "application/json" },
// };
const user = JSON.parse(localStorage.getItem('user'));
const accessToken = user ? user.accessToken : null;
const getConfig = { headers: { 'X-Auth-Token': accessToken } };

const API_URL = 'http://127.0.0.1:8080/';
// 리덕스랑 관련없는 서버 통신 API들 모음

export const fetchFollow =  async (setFollowCount, userId) =>  {
    
  console.log('fetch 팔로우 카운트');

  try {
    const response = await axios.get(
      API_URL + `follow/follower-followee-cnt/${userId}`,
      // 엑세스 토큰이 필요하다.
      getConfig
    );
    console.log(response.data.data)
    setFollowCount(
      response.data.data
    );


  } catch (err) {
    console.log('팔로우 에러')
    return err.response;
  }
};