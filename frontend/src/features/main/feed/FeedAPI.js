import axios from 'axios';
import { API_URL } from '../../../common/api/http-config';

export const fetchFeed = async () => {
  const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;

  try {
    const response = await axios.get(API_URL + `feed`, {
      headers: {
        'X-AUTH-TOKEN': accessToken,
      },
    });

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchFeedMore = async (nextId) => {
  if (nextId === -1) {
    return;
  }
  const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;

  try {
    const response = await axios.get(API_URL + `feed/more?id=${nextId}`, {
      headers: {
        'X-AUTH-TOKEN': accessToken,
      },
    });

    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
