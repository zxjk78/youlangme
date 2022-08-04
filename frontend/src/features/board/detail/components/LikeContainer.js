import { Link } from 'react-router-dom';
import UserInfo from '../../../profile/LeftProfile/UserInfo/UserInfo';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import { API_URL } from '../../../../common/api/http-config';
import classes from './LikeContainer.module.scss';


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
        <div onClick={showLikeUserModal}>{props.likeCnt}</div>
      </div>
    </>
  );
};
export default LikeContainer;
