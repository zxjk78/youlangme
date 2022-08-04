import axios from 'axios';
import { API_URL } from '../../../common/api/http-config';

// 리덕스랑 관련없는 서버 통신 API들 모음
// chips에 담을 hobby 데이터 fetch
export const fetchHobbies = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const accessToken = user ? user.accessToken : null;
  const getConfig = { headers: { 'X-Auth-Token': accessToken } };

  try {
    const response = await axios.get(API_URL + `favorite/list`, getConfig);
    // console.log('hobby', response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const nameDupCheck = async (name) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const accessToken = user ? user.accessToken : null;
  const getConfig = { headers: { 'X-Auth-Token': accessToken } };

  try {
    const response = await axios.get(
      API_URL + `user/check-name/?name=${name}`,
      // 엑세스 토큰이 필요하다.
      getConfig
    );
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const dispatchUserBasicInfo = async (userInfo, isUpdate) => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(userInfo);
  const accessToken = user ? user.accessToken : null;
  const postConfig = {
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': accessToken,
    },
  };

  try {
    const response = await axios.put(
      API_URL + 'user/basic-info',
      JSON.stringify(userInfo),
      postConfig
    );

    // let response;
    // if (!isUpdate) {
    //   response = await axios.post(
    //     API_URL + 'user/basic-info',
    //     JSON.stringify(userInfo),
    //     postConfig
    //   );
    // } else {
    //   response = await axios.put(
    //     API_URL + 'user/basic-info',
    //     JSON.stringify(userInfo),
    //     postConfig
    //   );
    // }

    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
