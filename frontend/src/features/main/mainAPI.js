import axios from 'axios';

const API_URL = 'http://127.0.0.1:8080/';

export const fetchBoard = async (page = 1) => {
  const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;

  try {
    const response = await axios.get(API_URL + `board/list?page=${page}`, {
      headers: {
        'X-AUTH-TOKEN': accessToken,
      },
    });

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
