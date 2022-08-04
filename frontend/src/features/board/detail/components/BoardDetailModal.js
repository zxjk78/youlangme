import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { createdDateCal } from '../../../../utils/functions/commonFunctions';
import { useParams } from 'react-router-dom';
// API
import {
  fetchBoardInfo,
  fetchReplyList,
  fetchLikeUsers,
  addComment,
  like,
  dislike,
  deleteBoard,
} from '../../boardAPI';
import Modal from '../../../../common/UI/Modal/Modal';
//components
import ReplyListItem from './ReplyListItem';
import LikeContainer from './LikeContainer';
import UserInfo from '../../../profile/LeftProfile/UserInfo/UserInfo';
import LikeUserModal from './likeModal/LikeUserModal';
import PhotoCarousel from './PhotoCarousel/PhotoCarousel';
// mui
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
// css
import classes from './BoardDetailModal.module.scss';
// etc
import { API_URL } from '../../../../common/api/http-config';

const BoardDetailModal = (props) => {
  const [boardDetail, setBoardDetail] = useState(null);
  const [replyList, setReplyList] = useState([]);
  const [likeUsers, setLikeUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsliked] = useState(false);
  const [likeUserVisible, setLikeUserVisible] = useState(false);
  const [likeCnt, setLikeCnt] = useState(0);
  const [replyCnt, setReplyCnt] = useState(0);
  const params = useParams();
  const boardId = props?.boardId || params.boardId;
  const commentRef = useRef();
  const history = useHistory();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const boardDetail = await fetchBoardInfo(boardId);
      // console.log(boardDetail);
      if (!boardDetail) {
        history.replace({
          pathname: '/404',
          message: '존재하지 않는 게시물입니다.',
        });
      }

      const replyList = await fetchReplyList(boardId);
      const likeUsers = await fetchLikeUsers(boardId);

      const currentUserId = JSON.parse(localStorage.getItem('currentUser')).id;
      for (const iterator of likeUsers) {
        if (iterator.id === currentUserId) {
          setIsliked(true);
        }
      }

      setBoardDetail(boardDetail);
      setReplyList(replyList);
      setReplyCnt(replyList.length);
      setLikeUsers(likeUsers);
      setLikeCnt(likeUsers.length);

      setIsLoading(false);
    })();
  }, [boardId]);

  const addCommentHandler = async (event) => {
    event.preventDefault();
    const newComment = commentRef.current.value;
    if (!newComment.trim().length) {
      return;
    }
    const response = await addComment(boardId, newComment);
    if (response.success) {
      commentRef.current.value = '';
      // 댓글작성 후 comment 재 fetch
      const newreplyList = await fetchReplyList(boardId);
      setReplyCnt(() => response.data.replyCnt);
      props.replyChangeHandler(response.data.replyCnt);
      setReplyList(() => {
        return [...newreplyList];
      });
    }
  };

  const likeHandler = async () => {
    const result = await like(boardId);

    if (result.success) {
      // 부모에게 전달
      props.likeChangeHandler(result.data.likeCnt);
      setLikeCnt(result.data.likeCnt);
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const addedUser = { id: currentUser.id, name: currentUser.name };
      setIsliked(true);
      setLikeUsers((prevState) => [...prevState, addedUser]);
    }
  };
  const dislikeHandler = async () => {
    const result = await dislike(boardId);
    if (result.success) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      // 부모에게 전달
      props.likeChangeHandler(result.data.likeCnt);
      setLikeCnt(result.data.likeCnt);
      setIsliked(false);
      setLikeUsers((prevState) =>
        prevState.filter((user) => user.id !== currentUser.id)
      );
    }
  };
  const updateBoardHandler = () => {
    const currentUserId = JSON.parse(localStorage.getItem('currentUser')).id;
    if (currentUserId !== boardDetail.userId) {
      alert('부적절한 접근입니다.');
      return;
    }
    history.push(`/board/update/${boardId}`);
  };
  const deleteBoardHandler = async () => {
    const confirm = window.confirm('정말 삭제하시겠습니까?');
    if (!confirm) {
      return;
    }
    // delete API 요청
    const data = await deleteBoard(boardId);
    if (data.success === true) {
      history.push('/main');
    }
  };
  const showLikeUserModal = () => {
    setLikeUserVisible((prevState) => !prevState);
  };
  const likeModalClose = () => {
    setLikeUserVisible(() => false);
  };
  const closeModal = () => {
    props.closeModalHandler();
  };
  return (
    <>
      {isLoading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <Modal closeModalHandler={closeModal}>
          {likeUserVisible && (
            <LikeUserModal
              likeUserList={likeUsers}
              closeModal={likeModalClose}
            />
          )}

          <div className={classes.wrapper}>
            <div className={classes.boardHeader}>
              <UserInfo user={currentUser} />

              <div className={classes.createdAt}>
                {createdDateCal(boardDetail.createdTime)}
              </div>
            </div>
            <div className={classes.main}>
              <div className={classes.contentContainer}>
                <p>{boardDetail.contents}</p>
              </div>
              <div className={classes.photoContainer}>
                {boardDetail.imgList.length > 3 ? (
                  <PhotoCarousel pics={boardDetail.imgList} />
                ) : (
                  <div>
                    {boardDetail.imgList.map((image) => (
                      <img
                        key={image}
                        src={`${API_URL}image/board/${image}`}
                        alt="게시판 이미지"
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className={classes.likeCommentCnt}>
                <div>
                  <LikeContainer
                    isLiked={isLiked}
                    like={likeHandler}
                    dislike={dislikeHandler}
                    likeCnt={likeCnt}
                    showModal={showLikeUserModal}
                  />
                </div>
                {/* <div>
                  <ChatBubbleOutlineIcon />
                  {replyList.length}
                </div> */}
              </div>
              <br />
            </div>
            {boardDetail.userId ===
              JSON.parse(localStorage.getItem('currentUser')).id && (
              <div className={classes.authOptionContainer}>
                <button type="button" onClick={updateBoardHandler}>
                  글 수정{' '}
                </button>
                <button type="button" onClick={deleteBoardHandler}>
                  글 삭제
                </button>
              </div>
            )}

            <div className={classes.comment}>
              <div className={classes.header}>
                <ChatBubbleOutlineIcon />
                <div>댓글 ({replyCnt}) </div>
              </div>
              <div className={classes.commentContainer}>
                {replyList.map((comment) => (
                  <ReplyListItem key={comment.id} commentInfo={comment} />
                ))}
              </div>
              <div className={classes.commentInput}>
                <form onSubmit={addCommentHandler}>
                  <input
                    type="text"
                    placeholder="댓글을 입력하세요"
                    ref={commentRef}
                  />
                  <button>
                    <SendIcon />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default BoardDetailModal;
