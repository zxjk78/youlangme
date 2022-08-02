import { Link } from 'react-router-dom';
import classes from './UserInfo.module.scss';

import { iso_code } from './flagData';
const API_URL = 'http://127.0.0.1:8080/';

const UserInfo = (props) => {
  // redux-persist에서 가져온 유저정보
  const user = props.user;
  return (
    <>
      <div className={classes.wrapper}>
        <Link
          to={`/profile/${user.id}`}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <div className={classes.container}>
            <div className={classes.imageContainer}>
              <img
                src={`${API_URL}image/profile/${user.id}.jpg`}
                className={classes.userProfileImg}
                alt=""
              />
              {user?.nationality && (
                <img
                  src={`http://www.geonames.org/flags/x/${
                    iso_code[user.nationality]
                  }.gif`}
                  className={classes.userNationFlag}
                  alt="국기이미지"
                />
              )}
            </div>
            <div className={classes.name}>
              <div>{user.name}</div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default UserInfo;
