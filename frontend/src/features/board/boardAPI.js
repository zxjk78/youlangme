import axios from 'axios';
const API_URL = 'http://127.0.0.1:8080/';

export const createBoard = async (content, images) => {
  const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;
  // console.log('boardAPI post 게시글 생성요청, formData 사용할지, 그냥 key-val로 보낼지 결정');
  const formData = new FormData();

  for (let i = 0; i < images.length; i++) {
    formData.append('pics', images[i]);
  }
  formData.append('contents', content);

  try {
    const response = await axios.post(API_URL + `board`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-AUTH-TOKEN': accessToken,
      },
    });
    // console.log('board post api', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchBoardInfo = async (boardId) => {
  // console.log('boardId로 게시글 상세정보 받기');
  const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;
  const header = {
    'X-Auth-Token': accessToken,
  };
  try {
    const response = await axios.get(API_URL + `board/${boardId}`, {
      headers: header,
    });

    // console.log(response);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCommentList = async (boardId) => {
  const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;
  const header = {
    'X-Auth-Token': accessToken,
  };
  try {
    const response = await axios.get(API_URL + `reply/replyList/${boardId}`, {
      headers: header,
    });

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchLikeUsers = async (boardId) => {
  const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;
  const header = {
    'X-Auth-Token': accessToken,
  };
  try {
    const response = await axios.get(API_URL + `board/likeUsers/${boardId}`, {
      headers: header,
    });

    return response.data.data;
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
export const updateBoard = async (boardId, content, images) => {
  const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;
  const formData = new FormData();

  for (let i = 0; i < images.length; i++) {
    formData.append('pics', images[i]);
  }
  formData.append('contents', content);
  const header = {
    'X-Auth-Token': accessToken,
  };

  try {
    const response = await axios.put(API_URL + `board/${boardId}`, formData, {
      headers: header,
    });

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
