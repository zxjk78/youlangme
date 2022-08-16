import { useState } from 'react';
// router
import { useHistory } from 'react-router-dom';
//custom component
import UserInfo from '../../LeftProfile/UserInfo/UserInfo';
import BoardDetailModal from '../../../board/detail/components/BoardDetailModal';
import BoardImageSrc from '../../../../common/UI/BoardImageSrc';
// API
import { fetchProfile } from '../../../profile/LeftProfile/LeftProfileAPI';
//mui
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
// css
import classes from './ProfileBoardSummaryItem.module.scss';
// etc
import { createdDateCal } from '../../../../common/utils/functions/commonFunctions';
import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import LikeContainer from '../../../board/detail/components/LikeContainer';
import { red } from '@mui/material/colors';
import { fetchLikeUsers } from '../../../board/boardAPI';

// 클릭시 디테일로 이동하는 부분으로 어디로 정할지를 의논할 것
const ProfileBoardSummaryItem = (props) => {
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const boardInfo = props.boardInfo;
  const [likeCnt, setLikeCnt] = useState(boardInfo.likeCnt);
  const [isLiked, setIsLiked] = useState(false);
  const [replyCnt, setReplyCnt] = useState(boardInfo.replyCnt);
  const [isLoading, setIsLoading] = useState(true);
  const [boardUserName, setBoardUserName] = useState('');
  const [boardUserNationality, setBoardUserNationality] = useState('');

  // console.log(boardInfo);
  const showDetailModal = (event) => {
    setIsModalVisible(() => true);
  };

  const likeChange = (cnt, isLikedOrNot) => {
    setLikeCnt(() => cnt);
    setIsLiked(() => isLikedOrNot);
  };
  const replyChange = (cnt) => {
    setReplyCnt(() => cnt);
  };
  const closeModal = () => {
    setIsModalVisible(() => false);
    // history.go(0);
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      
      const boardUserProfileInfo = await fetchProfile(boardInfo.userId);
      const likeUsers = await fetchLikeUsers(boardInfo.boardId);
      console.log(boardUserProfileInfo)
      setBoardUserNationality(boardUserProfileInfo.nationality)
      setBoardUserName(boardUserProfileInfo.name)

      setIsLoading(false);
      const currentUserId = JSON.parse(localStorage.getItem('currentUser')).id;
      for (const iterator of likeUsers) {
        if (iterator.id === currentUserId) {
          setIsLiked(true);
        }
      }
    })();
  }, [boardInfo.boardId]);

  return (
    <>
      {isLoading ? (
          <div>
            <CircularProgress />
          </div>
        ) : (
          <>
            {isModalVisible && (
              <div>
                <BoardDetailModal
                  boardId={boardInfo.boardId}
                  boardUserName={boardUserName}
                  boardUserNationality={boardUserNationality}
                  closeModalHandler={closeModal}
                  likeChangeHandler={likeChange}
                  replyChangeHandler={replyChange}
                />
              </div>
            )}
            <div className={classes.wrapper}>
              <div className={classes.container}>
                <div className={classes.header}>
                  <div className={classes.user_profile}>
                    <UserInfo
                      user={{ id: boardInfo.userId, name: boardInfo.userName, nationality:boardUserNationality }}
                    />
                  </div>
                  <div>{createdDateCal(boardInfo.createdTime, false)}</div>
                </div>
                <div className={classes.main} onClick={showDetailModal}>
                  <div className={classes.contentContainer}>
                    <div className={classes.content}>{boardInfo.contents}</div>
                    <div className={classes.imgContainer}>
                      {boardInfo.imgList.slice(0, 3).map((image) => (
                        <BoardImageSrc imgName={image} alt={image} key={image} />
                      ))}
                      {/* {boardInfo.imgList.length > 3 && <AddIcon />} */}
                    </div>
                  </div>
                  <div className={classes.footer}>
                    <div>
                      {isLiked ?
                      <FavoriteIcon sx={{ mr: 1, color: red[500] }}/>
                      : <FavoriteBorderIcon sx={{ mr: 1, color: '#5c5a5a' }}/>
                      }
                      <span className={classes.cnt}>
                        {likeCnt}
                      </span>
                    </div>
                    <div>
                      <ChatBubbleOutlineIcon sx={{ mr: 1, color: '#5c5a5a'}}/>
                      <span className={classes.cnt}>
                        {replyCnt}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </div> 
          </>
        )}
    </>
  );
};
export default ProfileBoardSummaryItem;
