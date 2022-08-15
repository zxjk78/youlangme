// react core
import { useState } from 'react';
// custom component
import UserInfo from '../../profile/LeftProfile/UserInfo/UserInfo';
import BoardDetailModal from '../../board/detail/components/BoardDetailModal';
//API
import { fetchProfile } from '../../profile/LeftProfile/LeftProfileAPI';
import { fetchReplyList, fetchLikeUsers } from '../../board/boardAPI';

// mui
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhotoIcon from '@mui/icons-material/Photo';
// css
import classes from './FeedBoardItem.module.scss';

// etc
import { createdDateCal } from '../../../common/utils/functions/commonFunctions';
import { useEffect } from 'react';
import { API_URL } from '../../../common/api/http-config';

const FeedLIstItem = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const boardInfo = props.boardInfo;
  const contents = boardInfo?.contents;
  const username = boardInfo?.userName;
  const userId = boardInfo?.userId;
  const boardId = boardInfo?.detail;
  const createdAt = createdDateCal(boardInfo.createdTime, false);
  const [boardUserNationality, setBoardUserNationality] = useState('');
  const [replyCnt, setReplyCnt] = useState(boardInfo?.replyCnt || 0);
  const [likeCnt, setlikeCnt] = useState(boardInfo?.likeCnt || 0);

  const showBoardDetailModal = () => {
    setModalVisible(() => true);
  };
  const closeModal = () => {
    setModalVisible(() => false);
  };
  const likeChange = (cnt) => {
    setlikeCnt(() => cnt);
  };
  const replyChange = (cnt) => {
    setReplyCnt(() => cnt);
  };

  useEffect(() => {
    (async () => {
      const profileDetail = await fetchProfile(userId);
      setBoardUserNationality(profileDetail.nationality);
      const boardLikeCnt = await fetchLikeUsers(boardId);
      const boardReplyCnt = await fetchReplyList(boardId);
      setlikeCnt(() => boardLikeCnt.length);
      setReplyCnt(() => boardReplyCnt.length);
    })();

    return () => {};
  }, [userId]);

  return (
    <>
      {modalVisible && (
        <BoardDetailModal
          boardId={boardId}
          closeModalHandler={closeModal}
          likeChangeHandler={likeChange}
          replyChangeHandler={replyChange}
        />
      )}
      <div className={classes.wrapper} onClick={showBoardDetailModal}>
        <div className={classes.container}>
          <div className={classes.header}>
            <div className={classes.author}>
              <UserInfo
                user={{
                  id: userId,
                  name: username,
                  nationality: boardUserNationality,
                }}
                small
              />
            </div>
            <div className={classes.createdAt}>{createdAt}</div>
          </div>
          <div className={classes.content}>
            <div
              className={`${classes.text} ${
                boardInfo.imgList.length === 0 && classes.noPic
              }`}
            >
              {contents}
            </div>
            {boardInfo.imgList.length > 0 && (
              <div>
                <img
                  src={`${API_URL}image/board/${boardInfo.imgList[0]}`}
                  alt="게시물 사진"
                  className={classes.image}
                />
              </div>
            )}
            <div className={classes.photo}></div>
          </div>
          <div className={classes.footerWrapper}>
            <div className={classes.footer}>
              <div>
                <FavoriteBorderIcon sx={{ mr: 1, color: '#5c5a5a' }} />
                <span className={classes.cnt}>{likeCnt}</span>
              </div>
              <div>
                <ChatBubbleOutlineIcon sx={{ mr: 1, color: '#5c5a5a' }} />
                <span className={classes.cnt}>{replyCnt}</span>
              </div>
              <div>
                {boardInfo.imgList.length > 0 && (
                  <>
                    <PhotoIcon sx={{ mr: 1, color: '#5c5a5a' }} />
                    <span className={classes.cnt}>
                      {boardInfo.imgList.length}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedLIstItem;
