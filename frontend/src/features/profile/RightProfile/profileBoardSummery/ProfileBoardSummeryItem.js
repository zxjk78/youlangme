import { useState } from 'react';
// router
import { useHistory } from 'react-router-dom';
//custom component
import UserInfo from '../../LeftProfile/UserInfo/UserInfo';
import BoardDetailModal from '../../../board/detail/components/BoardDetailModal';
import BoardImageSrc from '../../../../common/UI/BoardImageSrc';
//mui
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
// css
import classes from './ProfileBoardSummeryItem.module.scss';
// etc
import { createdDateCal } from '../../../../common/utils/functions/commonFunctions';

// 클릭시 디테일로 이동하는 부분으로 어디로 정할지를 의논할 것
const ProfileBoardSummeryItem = (props) => {
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const boardInfo = props.boardInfo;
  const [likeCnt, setLikeCnt] = useState(boardInfo.likeCnt);
  const [replyCnt, setReplyCnt] = useState(boardInfo.replyCnt);
  // console.log(boardInfo);
  const showDetailModal = (event) => {
    setIsModalVisible(() => true);
  };

  const likeChange = (cnt) => {
    setLikeCnt(() => cnt);
  };
  const replyChange = (cnt) => {
    setReplyCnt(() => cnt);
  };
  const closeModal = () => {
    setIsModalVisible(() => false);
    // history.go(0);
  };


  return (
    <>
      {isModalVisible && (
        <div>
          <BoardDetailModal
            boardId={boardInfo.boardId}
            closeModalHandler={closeModal}
            likeChangeHandler={likeChange}
            replyChangeHandler={replyChange}
          />
        </div>
      )}
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}>
            <UserInfo
              user={{ id: boardInfo.userId, name: boardInfo.userName }}
            />
            <div>{createdDateCal(boardInfo.createdTime, false)}</div>
          </div>
          <div className={classes.main} onClick={showDetailModal}>
            <div className={classes.contentContainer}>{boardInfo.contents}</div>
            <div className={classes.imgContainer}>
              {boardInfo.imgList.slice(0, 3).map((image) => (
                <BoardImageSrc imgName={image} alt={image} key={image} />
              ))}
              {/* {boardInfo.imgList.length > 3 && <AddIcon />} */}
            </div>
          </div>
          <div className={classes.footer}>
            <div>
              <FavoriteBorderIcon /> {likeCnt}
            </div>
            <div>
              <ChatBubbleOutlineIcon /> {replyCnt}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfileBoardSummeryItem;
