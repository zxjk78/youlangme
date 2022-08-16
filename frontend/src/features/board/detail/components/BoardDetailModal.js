import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { createdDateCal } from '../../../../common/utils/functions/commonFunctions';
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
//custom components
import ReplyListItem from './ReplyListItem';
import LikeContainer from './LikeContainer';
import UserInfo from '../../../profile/LeftProfile/UserInfo/UserInfo';
import LikeUserModal from './likeModal/LikeUserModal';
import PhotoCarousel from './PhotoCarousel/PhotoCarousel';
import BoardImageSrc from '../../../../common/UI/BoardImageSrc';
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
  const replyRef = useRef();
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
    const newComment = replyRef.current.value;
    if (!newComment.trim().length) {
      return;
    }
    const response = await addComment(boardId, newComment);
    if (response.success) {
      replyRef.current.value = '';
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
      props.likeChangeHandler(result.data.likeCnt, true);
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
      props.likeChangeHandler(result.data.likeCnt, false);
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
      history.goBack();
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
      <Modal closeModalHandler={closeModal} boardDetail>
        {isLoading ? (
          <div>
            <CircularProgress />
          </div>
        ) : (
          <>
            {likeUserVisible && (
              <LikeUserModal
                likeUserList={likeUsers}
                closeModal={likeModalClose}
              />
            )}

            <div className={classes.wrapper}>
              <div className={classes.board_detail_container}>

                <div className={classes.boardHeader}>
                  <div className={classes.boardHeaderUserProfile}>
                    <UserInfo
                      user={{
                        id: boardDetail.userId,
                        name: props.boardUserName,
                        nationality: props.boardUserNationality
                      }}
                    />
                  </div>

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
                          <BoardImageSrc
                            imgName={image}
                            alt={image}
                            key={image}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className={classes.board_footer}>
                  <div className={classes.likeReplyCnt}>
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
                  {boardDetail.userId ===
                    JSON.parse(localStorage.getItem('currentUser')).id && (
                    <div className={classes.authOptionContainer}>
                      <button type="button" onClick={updateBoardHandler}>
                        수정{' '}
                      </button>
                      <button type="button" onClick={deleteBoardHandler}>
                        삭제
                      </button>
                    </div>
                  )}

                </div>
              </div>


              <div className={classes.reply}>
                <div className={classes.header}>
                  <ChatBubbleOutlineIcon sx={{ fontSize: 25, mx:1 }} />
                  <div>댓글 </div>
                  <div className={classes.reply_cnt_num}>{replyCnt}</div>
                  <div>개</div>
                </div>
                <div className={classes.replyInput}>
                  <form onSubmit={addCommentHandler}>
                    <input
                      type="text"
                      placeholder="댓글을 입력하세요"
                      ref={replyRef}
                    />
                    <button>
                      <SendIcon />
                    </button>
                  </form>
                </div>
                <div className={classes.replyContainer}>
                  {replyList.length === 0 ? (
                    <div className={classes.noReply}>댓글이 없습니다</div>
                  ) : (
                    replyList.map((reply) => (
                      <ReplyListItem key={reply.id} commentInfo={reply} />
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default BoardDetailModal;
