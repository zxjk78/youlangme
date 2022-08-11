import * as React from 'react';
import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

// component
import BadgeEdit from './BadgeEdit';

// API 통신
import { fetchFollowCnt } from '../../LeftProfile/Follow/FollowAPI';

// data
import { badgeDetailList } from './BadgeDetailData';
// mui
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';


// css
import classes from '../RightProfile.module.scss'


const MyBadgeCollection = (props) => {
  const userId = props.userId;
  const { currentUser } = useSelector((state) => state.auth);
  const isCurrentUser = currentUser.id === Number(userId);

  const [followCnt, setFollowCnt] = useState({
    followerCnt: 0, followeeCnt: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  
  const popularBadgeIdx = badgeDetailList[4].criteria.findLastIndex( (crt, idx) => 
    followCnt.followerCnt >= crt
    )
    console.log(popularBadgeIdx)

  const activeBadgeEndIdxList = [-1, -1, -1, -1, popularBadgeIdx]

  useEffect(() => {
    fetchFollowCnt(setFollowCnt, userId);
    
    setIsLoading(false);
  }, [ userId, currentUser])
  
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
          {isCurrentUser && <BadgeEdit activeBadgeEndIdxList={activeBadgeEndIdxList}/>}      
        </Typography>
      </div>


      <div className={classes.badge_card}  
        >
            {/* <img src={attendTestBadge} alt="" className={classes.badge_image} /> */}
            {/* <img src={process.env.PUBLIC_URL + '/img/attend_14.png'} alt="" className={classes.badge_image} /> */}
            {/* 임시로 fetch 해온거! */}
            <img src={'/badges/15.png'} alt="" className={classes.badge_image} />
            <img src={'/badges/25.png'} alt="" className={classes.badge_image}/>
            <img src={'/badges/35.png'} alt="" className={classes.badge_image}/>
            <img src={'/badges/45.png'} alt="" className={classes.badge_image}/>
            {popularBadgeIdx >= 0 && <img src={`/badges/${51+popularBadgeIdx}.png`} alt=""
              className={classes.badge_image}/>
            }
      </div>
    </div>

  )
}


export default MyBadgeCollection


