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
    const response = await axios.get(API_URL + `user/langlist`, {
      headers: { 'X-Auth-Token': accessToken },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchRecommendUser = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const accessToken = user.accessToken;

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const userId = currentUser.id;
  try {
    const response = await axios.get(API_URL + `follow/followers/${userId}`, {
      headers: {
        'X-AUTH-TOKEN': accessToken,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// export const sendFollow = async (userId) => {
//   const user = JSON.parse(localStorage.getItem('user'));
//   const accessToken = user.accessToken;
//   try {
//     const response = await axios.post(
//       API_URL + `follow/${userId}`,
//       {},
//       {
//         headers: {
//           'X-AUTH-TOKEN': accessToken,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const sendUnFollow = async (userId) => {
//   const user = JSON.parse(localStorage.getItem('user'));
//   const accessToken = user.accessToken;
//   try {
//     const response = await axios.delete(API_URL + `follow/${userId}`, {
//       headers: {
//         'X-AUTH-TOKEN': accessToken,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// };
