import { Link } from 'react-router-dom';
import UserInfo from '../../../profile/UserInfo/UserInfo';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import classes from './LikeContainer.module.scss';
const API_URL = 'http://127.0.0.1:8080/';

const LikeContainer = (props) => {
  const [likeUserVisible, setLikeUserVisible] = useState(false);
  const dislikeHandler = () => {
    props.dislike();
  };
  const likeHandler = () => {
    props.like();
  };
  const showLikeUserModal = () => {
    // 생각해보니까 모달의 모달이 됨 - 인스타그램에서는 크게 신경 안쓰는거같은데
    // 모달 창이 아니라 조건부 렌더링으로 작성해야될듯...
    setLikeUserVisible((prevState) => !prevState);
  };
  return (
    <>
      <div className={classes.container}>
        <div>
          {props.isLiked ? (
            <FavoriteIcon onClick={dislikeHandler} />
          ) : (
            <FavoriteBorderIcon onClick={likeHandler} />
          )}
        </div>
        <div onClick={showLikeUserModal}>{props.likeUsers.length}</div>
        {likeUserVisible && (
          <div className={classes.likeUserList}>
            <h3>좋아요</h3>
            {props.likeUsers.map((user) => {
              return (
                <Link to={`/profile/${user.id}`} key={user.id}>
                  <UserInfo user={user} />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
export default LikeContainer;
