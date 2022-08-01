import { Link } from 'react-router-dom';
import UserInfo from '../../../profile/LeftProfile/UserInfo/UserInfo';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import classes from './LikeContainer.module.scss';
const API_URL = 'http://127.0.0.1:8080/';

const LikeContainer = (props) => {
  const dislikeHandler = () => {
    props.dislike();
  };
  const likeHandler = () => {
    props.like();
  };
  const showLikeUserModal = () => {
    props.showModal();
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
      </div>
    </>
  );
};
export default LikeContainer;
