import UserInfo from '../../profile/LeftProfile/UserInfo/UserInfo';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { modalActions } from '../../../common/UI/Modal/modalSlice';
//mui
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
// css
import classes from './ProfileBoardSummeryItem.module.scss';
import { createdDateCal } from '../func/commonFunctions';

const API_URL = 'http://127.0.0.1:8080/';
// 클릭시 디테일로 이동하는 부분으로 어디로 정할지를 의논할 것
const ProfileBoardSummeryItem = (props) => {
  const boardInfo = props.boardInfo;
  const showDetailModal = (event) => {
    props.showDetail(boardInfo.boardId);
  };
  return (
    <>
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
              <FavoriteBorderIcon />
              {boardInfo.likeCnt}
            </div>
            <div>
              <ChatBubbleOutlineIcon />
              {boardInfo.replyCnt}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfileBoardSummeryItem;
