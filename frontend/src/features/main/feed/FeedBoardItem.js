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

const FeedBoardItem = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const boardInfo = props.boardInfo;
  const contents = boardInfo?.contents;
  const username = boardInfo?.userName;
  const userId = boardInfo?.userId;
  const boardId = boardInfo?.boardId;
  const createdAt = createdDateCal(boardInfo.createdTime, false);
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
              <UserInfo user={{ id: userId, name: username }} />
            </div>
            <div className={classes.createdAt}>{createdAt}</div>
          </div>
          <div className={classes.content}>{contents}</div>
          <div className={classes.footerWrapper}>
            <div className={classes.footer}>
              <div>
                <ChatBubbleOutlineIcon />
                {replyCnt}
              </div>
              <div>
                <FavoriteBorderIcon />
                {likeCnt}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedBoardItem;
