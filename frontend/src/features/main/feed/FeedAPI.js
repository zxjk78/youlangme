import axios from 'axios';
import { API_URL } from '../../../common/api/http-config';


export const fetchAllFeed = async () => {
  const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;

  try {
    const response = await axios.get(
      API_URL + `feed`,
      {
        headers: {
          'X-AUTH-TOKEN': accessToken,
        },
      }
    );
    
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
