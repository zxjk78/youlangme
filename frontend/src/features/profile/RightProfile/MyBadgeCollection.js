import * as React from 'react';

import { useSelector } from 'react-redux';

// component
import BadgeEdit from './BadgeEdit';


// mui
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import attendTestBadge from '../../../assets/badges/attend_14.png'
import writerTestBadge from '../../../assets/badges/writer_21.png'
import followersTestBadge from '../../../assets/badges/followers_51.png'
import commentTestBadge from '../../../assets/badges/comment_35.png'
import chattingTestBadge from '../../../assets/badges/chatting_45.png'

// css
import classes from './RightProfile.module.scss'

const MyBadgeCollection = (props) => {
  const userId = props.userId;
  const { currentUser } = useSelector((state) => state.auth);
  const isCurrentUser = currentUser.id === Number(userId);

  return (
    <div className={classes.badge_container}>
      <div>
        <Typography 
          gutterBottom color="#9BA7AF"
          sx={{
              // color: 'rgba(0, 0, 0, 0.6)',
              fontSize: 16,
              fontWeight: 'bold',
            }} 
          component="div">
          내 배지
          {isCurrentUser && <BadgeEdit/>}      
        </Typography>
      </div>


      <div className={classes.badge_card}  
        >
            {/* <img src={attendTestBadge} alt="" className={classes.badge_image} /> */}
            {/* <img src={process.env.PUBLIC_URL + '/img/attend_14.png'} alt="" className={classes.badge_image} /> */}
            {/* 임시로 fetch 해온거! */}
            <img src={'/badges/15.png'} alt="" className={classes.badge_image} />
            <img src={writerTestBadge} alt="" className={classes.badge_image}/>
            <img src={followersTestBadge} alt="" className={classes.badge_image}/>
            <img src={commentTestBadge} alt="" className={classes.badge_image}/>
            <img src={chattingTestBadge} alt="" className={classes.badge_image}/>
      </div>
    </div>

  )
}


export default MyBadgeCollection


