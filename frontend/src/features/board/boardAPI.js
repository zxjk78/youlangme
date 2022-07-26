import axios from 'axios';
const API_URL = 'http://127.0.0.1:8080/';

export const createBoard = async (content, images) => {
  const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;
  console.log('boardAPI post 게시글 생성요청');
  console.log(content, images);
  const formData = new FormData();
  formData.append('images', images);
  formData.append('content', content);

  const response = await axios.post(API_URL + `board`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-Auth-Token': accessToken,
    },
  });
  console.log(response);
};
