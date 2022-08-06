import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classes from './UserInfo.module.scss';
import { iso_code } from './flagData';
import { API_URL } from '../../../../common/api/http-config';
import { fetchProfileImg } from '../LeftProfileAPI';

const UserInfo = (props) => {
  const { isProfileImgUpdated } = useSelector((state) => state.profile);
  const [profileImg, setProfileImg] = useState(null);
  // redux-persist에서 가져온 유저정보
  const imgErrorHandler = (e) => {
    e.target.src =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_RlT-ytB9A_TQFLKMqVYpdJiiRbckTCThmw&usqp=CAU';
  };
  const user = props.user;
  // console.log(user);
  useEffect(() => {
    (async () => {
      const profileImage = await fetchProfileImg(user.id);

      setProfileImg(profileImage);
      // setIsLoading(false);
      // console.log('navbar 프사: ', profileImg)
    })();

    return () => {
      setProfileImg(null);
    };
  }, [user.id, isProfileImgUpdated]);

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
                // src={`${API_URL}image/profile/${user.id}.jpg`}
                src={profileImg}
                onError={imgErrorHandler}
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
