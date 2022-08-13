// react core
import { useState } from 'react';
// custom component
import UserInfo from '../../profile/LeftProfile/UserInfo/UserInfo';
import BoardDetailModal from '../../board/detail/components/BoardDetailModal';

// mui
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

// css
import classes from './FeedBoardItem.module.scss';

// etc
import { createdDateCal } from '../../../common/utils/functions/commonFunctions';
import { API_URL } from '../../../common/api/http-config';
import { useEffect } from 'react';
import { fetchProfile } from '../../profile/LeftProfile/LeftProfileAPI';

const FeedBoardItem = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const boardInfo = props.boardInfo;
  const contents = boardInfo?.contents;
  const username = boardInfo?.userName;
  const userId = boardInfo?.userId;
  const boardId = boardInfo?.boardId;
  console.log(boardInfo, '여기 피드')
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
    })();

    return () => {
    };
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
              <UserInfo user={{ id: userId, name: username, nationality: boardUserNationality }} />
            </div>
            <div className={classes.createdAt}>{createdAt}</div>
          </div>
          <div className={classes.content}>{contents}</div>
          <div className={classes.footerWrapper}>
            <div className={classes.footer}>
              <div>
                <FavoriteBorderIcon sx={{ mr: 1, color: '#5c5a5a'}}/>
                <span className={classes.cnt}>
                  {likeCnt}
                </span>
              </div>
              <div>
                <ChatBubbleOutlineIcon sx={{ mr: 1, color: '#5c5a5a'}} />
                <span className={classes.cnt}>
                  {replyCnt}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedBoardItem;
