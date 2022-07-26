import { useState, useEffect } from 'react';

import axios from 'axios';

import { useParams } from 'react-router-dom';
// API
// import { fetchBoard } from '../../boardAPI';
import Modal from '../../../../common/UI/Modal/Modal';
// mui
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import classes from './BoardDetailModal.module.scss';
const BoardDetail = (props) => {
  const [boardDetail, setBoardDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const boardId = useParams().boardId;

  const API_URL = 'http://127.0.0.1:8080/';

  const fetchBoard = async (boardId) => {
    // console.log('boardId로 게시글 상세정보 받기');
    const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;
    const header = {
      'X-Auth-Token': accessToken,
    };
    try {
      const response = await axios.get(API_URL + `board/${boardId}`, {
        headers: header,
      });
      const data = response.data.data;
      setBoardDetail(data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBoard(boardId);
  }, [boardId]);

  // console.log(boardDetail);

  const addCommentHandler = (event) => {
    console.log('12123');
  };

  return (
    <>
      {!isLoading ? (
        <Modal>
          <div className={classes.wrapper}>
            <div className={classes.header}>
              <img
                src={`${API_URL}image/profile/${boardDetail.userId}.jpg`}
                alt="유저 프로파일 이미지"
              />
              <div className={classes.username}>{boardDetail.userName}</div>
              <div className={classes.createdAt}>
                {boardDetail.modifiedTime}
              </div>
            </div>
            <div className={classes.main}>
              <div className={classes.photoContainer}>
                {boardDetail.imgList.map((image) => (
                  <img
                    key={image}
                    src={`${API_URL}image/board/${image}`}
                    alt="게시판 이미지"
                  />
                ))}
              </div>
              <div className={classes.contentContainer}>
                {boardDetail.contents}
              </div>
              <div className={classes.likeCommentCnt}>
                <div>
                  <FavoriteBorderIcon />
                  좋아요 수: board/likes
                </div>
                <div>
                  <ChatBubbleOutlineIcon />
                  댓글 수: reply/replyList/boardId의 응답.length
                </div>
              </div>
              <br />
            </div>
            <div className={classes.comment}>
              <div className={classes.header}>
                <ChatBubbleOutlineIcon />
                <div>댓글</div>
              </div>
              <div className={classes.commentInput}>
                <form onSubmit={addCommentHandler}>
                  <input type="text" placeholder="댓글을 작성해주세요" />
                  <button>게시</button>
                </form>
              </div>
              <div className={classes.commentContainer}></div>
            </div>
          </div>
        </Modal>
      ) : (
        <div>123</div>
      )}
    </>
  );
};

export default BoardDetail;
