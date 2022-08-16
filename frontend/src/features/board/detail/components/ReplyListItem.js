import { useEffect, useState } from 'react';
import { API_URL } from '../../../../common/api/http-config';
import { createdDateCal } from '../../../../common/utils/functions/commonFunctions'
import UserInfo from '../../../profile/LeftProfile/UserInfo/UserInfo';
import { iso_code } from '../../../profile/LeftProfile/UserInfo/flagData';
// API
import { fetchProfile, fetchProfileImg } from '../../../profile/LeftProfile/LeftProfileAPI';
// mui
import { Avatar, Badge, CircularProgress, Typography } from '@mui/material';
// css
import classes from './ReplyListItem.module.scss';
import { Link } from 'react-router-dom';

const ReplyListItem = (props) => {
  const commentUserInfo = props.commentInfo;
  // console.log(commentUserInfo ,'commmmment')
  const [isLoading, setIsLoading] = useState(true);
  const [commentUserAllInfo, setCommentUserAllInfo] = useState(null);
  const [commentUserImg, setCommentUserImg] = useState(null);
  const nationalityCode = commentUserAllInfo ? iso_code[commentUserAllInfo.nationality] : null
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const commentUserProfileInfo = await fetchProfile(commentUserInfo.pid);
      console.log(commentUserAllInfo);
      const  commentUserProfileImg= await fetchProfileImg(commentUserInfo.pid);

      setCommentUserAllInfo(commentUserProfileInfo);
      setCommentUserImg(commentUserProfileImg);

      setIsLoading(false);
    })();
  }, [commentUserInfo.pid]);

  return (
    <>
    { isLoading? <CircularProgress /> : 
    
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header_content}>
            <Link
              to={`/profile/${commentUserInfo.pid}`}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <div className={classes.userContainer}>
                {/* <UserInfo
                  user={{
                    id: commentUserInfo.pid,
                    name: commentUserInfo.userName,
                    nationality: commentUserNationality,
                  }}
                /> */}
                <Badge
                  badgeContent={
                    <img className={classes.flag} alt="flag" 
                    src={`http://www.geonames.org/flags/x/${nationalityCode}.gif`} />
                  }
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  overlap="circular"
                >
                  <Avatar sx={{ width: 30, height: 30 }} 
                    src={commentUserImg} />
                </Badge>
                <Typography
                  className={classes.name}
                  sx={{ fontWeight: '700', fontSize: 15,  letterSpacing:1, 
                  // lineHeight: '35px',
                  my:'auto',
                  ml:1 }}
                  // gutterBottom
                  component="div"
                >
                  {commentUserAllInfo.name}
                </Typography>
              </div>
            </Link>
            <div className={classes.commentContainer}>
              {commentUserInfo.contents}
            </div>
          </div>
          <div className={classes.date}>
            {createdDateCal(commentUserInfo.createDate, false)}
          </div>
        </div>
      </div>
    }
    </>
  );
};

export default ReplyListItem;
