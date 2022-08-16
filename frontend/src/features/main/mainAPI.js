import axios from 'axios';
import { API_URL } from '../../common/api/http-config';

export const fetchUserRanking = async (userId) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const accessToken = user ? user.accessToken : null;
  try {
    const response = await axios.get(API_URL + `user/ranklist/${userId}`, {
      headers: { 'X-Auth-Token': accessToken },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchLanguageRanking = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const accessToken = user ? user.accessToken : null;

  try {
    const response = await axios.get(API_URL + `user/langlist/0`, {
      headers: { 'X-Auth-Token': accessToken },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// 추천유저 받는 API
export const fetchRecommendUser = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const accessToken = user.accessToken;

  try {
    const response = await axios.get(API_URL + `follow/recommendation`, {
      headers: {
        'X-AUTH-TOKEN': accessToken,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
