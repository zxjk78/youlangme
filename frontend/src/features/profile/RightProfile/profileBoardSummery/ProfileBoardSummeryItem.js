import UserInfo from '../../LeftProfile/UserInfo/UserInfo';
import { useState } from 'react';
// router
import { useHistory } from 'react-router-dom';
//component
import BoardDetailModal from '../../../board/detail/components/BoardDetailModal';
//mui
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
// css
import classes from './ProfileBoardSummeryItem.module.scss';
// etc
import { createdDateCal } from '../../../../utils/functions/commonFunctions';
import { API_URL } from '../../../../utils/data/apiData';

// 클릭시 디테일로 이동하는 부분으로 어디로 정할지를 의논할 것
const ProfileBoardSummeryItem = (props) => {
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const boardInfo = props.boardInfo;
  // console.log(boardInfo);
  const showDetailModal = (event) => {
    setIsModalVisible(() => true);
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
              {boardInfo.imgList.map((pic) => (
                <img
                  src={`${API_URL}image/board/${pic}`}
                  key={pic}
                  alt="사진"
                />
              ))}
            </div>
          </div>
          <div className={classes.footer}>
            <div>
              <FavoriteBorderIcon /> {boardInfo.likeCnt}
            </div>
            <div>
              <ChatBubbleOutlineIcon /> {boardInfo.replyCnt}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfileBoardSummeryItem;
