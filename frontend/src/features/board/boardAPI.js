import axios from 'axios';
const API_URL = 'http://127.0.0.1:8080/';

export const createBoard = async (content, images) => {
  const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;
  // console.log('boardAPI post 게시글 생성요청, formData 사용할지, 그냥 key-val로 보낼지 결정');
  // const formData = new FormData();

  // for (let i = 0; i < images.length; i++) {
  //   formData.append('pics', images[i]);
  // }
  // formData.append('contents', content);

  // // key-val pair 확인
  // for (let pair of formData.entries()) {
  //   console.log(pair[0], pair[1]);
  // }

  try {
    const response = await axios.post(
      API_URL + `board`,
      { contents: content, pics: images },
      // formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-AUTH-TOKEN': accessToken,
        },
      }
    );
    // console.log('board post api', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchBoard = async (boardId) => {
  // console.log('boardId로 게시글 상세정보 받기');
  const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;
  const header = {
    'X-Auth-Token': accessToken,
  };
  try {
    const response = await axios.get(API_URL + `board/${boardId}`, {
      headers: header,
    });
    const response2 = await axios.get(API_URL + `reply/replyList/${boardId}`, {
      headers: header,
    });

    const response3 = await axios.get(API_URL + `board/likeUsers/${boardId}`, {
      headers: header,
    });

    const boardInfo = {
      boardDetail: response.data.data,
      commentList: response2.data.data,
      likeUsers: response3.data.data,
    };
    return boardInfo;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBoard = async (boardId) => {
  const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;
  const header = {
    'X-Auth-Token': accessToken,
  };

  try {
    const response = await axios.delete(API_URL + `board/${boardId}`, {
      headers: header,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateBoard = async (boardId) => {
  const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;
  const header = {
    'X-Auth-Token': accessToken,
  };

  try {
    const response = await axios.put(
      API_URL + `board/${boardId}`,
      { data: '데이터 들어가는 부분' },
      {
        headers: header,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addComment = async (boardId, comment) => {
  const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;
  const currentUserId = JSON.parse(localStorage.getItem('currentUser')).id;
  const header = {
    'Content-Type': 'application/json',
    'X-Auth-Token': accessToken,
  };
  try {
    const response = await axios.post(
      API_URL + `reply/board/${boardId}`,
      { contents: comment, pid: currentUserId },
      {
        headers: header,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const like = async (boardId) => {
  const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;
  const header = {
    'Content-Type': 'application/json',
    'X-Auth-Token': accessToken,
  };
  try {
    const response = await axios.post(API_URL + `board/like/${boardId}`, null, {
      headers: header,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const dislike = async (boardId) => {
  const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;
  const header = {
    'Content-Type': 'application/json',
    'X-Auth-Token': accessToken,
  };
  try {
    const response = await axios.delete(
      API_URL + `board/dislike/${boardId}`,

      {
        headers: header,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
