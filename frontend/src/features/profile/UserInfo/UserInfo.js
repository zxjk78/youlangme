import { useSelector } from 'react-redux';
import classes from './UserInfo.module.scss';

import { iso_code } from './flagData';
const API_URL = 'http://127.0.0.1:8080/';

const UserInfo = () => {
  // redux-persist에서 가져온 유저정보
  const currentUser = useSelector((state) => state.auth.currentUser);
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.imageContainer}>
            <img
              src={`${API_URL}image/profile/${currentUser.id}.jpg`}
              className={classes.userProfileImg}
              alt=""
            />
            <img
              src={`http://www.geonames.org/flags/x/${
                iso_code[currentUser.nationality]
              }.gif`}
              className={classes.userNationFlag}
              alt="국기이미지"
            />
          </div>
          <div className={classes.name}>{currentUser.name}</div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
