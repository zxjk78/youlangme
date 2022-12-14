import Modal from '../../../../../common/UI/Modal/Modal';
import UserInfo from '../../../../profile/LeftProfile/UserInfo/UserInfo';
import CloseIcon from '@mui/icons-material/Close';

import classes from './LikeUserModal.module.scss';
import { useEffect, useState  } from 'react';



const LikeUserModal = (props) => {

  const closeHandler = () => {
    props.closeModal();
  };


  return (
    <>
      <Modal closeModalHandler={closeHandler} userLike>
        <div className={classes.wrapper}>
          <div className={classes.header}>
            <div>좋아요 누른 사람</div>
            <CloseIcon className={classes.close} onClick={closeHandler} />
          </div>
          <div className={classes.container}>
            {props.likeUserList.map((user) => {
              return (
                <div className={classes.like_each_user}>
                  <UserInfo key={user.id} user={user} />
                </div>
              ) 
            })}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LikeUserModal;
