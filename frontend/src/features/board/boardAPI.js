import axios from 'axios';
const API_URL = 'http://127.0.0.1:8080/';

export const createBoard = async (content, images) => {
  const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;
  // console.log('boardAPI post 게시글 생성요청');
  const formData = new FormData();

  if (images.length === 0) {
    formData.set('pics', []);
  }

  for (let i = 0; i < images.length; i++) {
    formData.append('pics', images[i]);
  }
  formData.append('contents', content);

  // key-val pair 확인
  for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }

  try {
    const response = await axios.post(API_URL + `board`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-Auth-Token': accessToken,
      },
    });
    // console.log('board post api', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchBoard = async (boardId, setStateFn) => {
  console.log('boardId로 게시글 상세정보 받기');
  const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;
  const header = {
    'X-Auth-Token': accessToken,
  };
  try {
    const response = await axios.get(API_URL + `board/${boardId}`, {
      headers: header,
    });
    setStateFn(response.data.data);
  } catch (error) {
    console.log(error);
  }
};
