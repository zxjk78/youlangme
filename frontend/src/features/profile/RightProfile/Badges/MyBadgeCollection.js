import * as React from 'react';
import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

// component
import BadgeEdit from './BadgeEdit';

// API 통신
import { fetchFollowCnt } from '../../LeftProfile/Follow/FollowAPI';
import { fetchLevelDetail } from '../RightProfileAPI';

// data
import { badgeDetailList } from './BadgeDetailData';
// mui
import { Card, CardContent, CardMedia, Typography, CardActionArea, CircularProgress } from '@mui/material';


// css
import classes from '../RightProfile.module.scss'


const MyBadgeCollection = (props) => {
  const userId = props.userId;
  const { currentUser } = useSelector((state) => state.auth);
  const isCurrentUser = currentUser.id === Number(userId);

  const [followersCnt, setFollowersCnt] = useState(0);
  const [levelDetail, setLevelDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  
  const attendBadgeIdx = badgeDetailList[0].criteria.findLastIndex( (crt) => 
    levelDetail.attendanceCnt >= crt
  )
  const boardBadgeIdx = badgeDetailList[1].criteria.findLastIndex( (crt) => 
    levelDetail.boardCnt >= crt
  )
  const commentBadgeIdx = badgeDetailList[2].criteria.findLastIndex( (crt) => 
    levelDetail.replyCnt >= crt
  )
  const friendBadgeIdx = badgeDetailList[3].criteria.findLastIndex( (crt) => 
    levelDetail.meetingCnt >= crt
  )
  const popularBadgeIdx = badgeDetailList[4].criteria.findLastIndex( (crt) => 
    followersCnt >= crt
  )

    // console.log('지금', levelDetail)

  const activeBadgeEndIdxList = [attendBadgeIdx , boardBadgeIdx, commentBadgeIdx, friendBadgeIdx, popularBadgeIdx]


  useEffect(() => {
    (
      async () => {
        const getLevelDetail = await fetchLevelDetail(userId);
        const getFollowCnt = await fetchFollowCnt(userId);

        setFollowersCnt(getFollowCnt.followerCnt);
        setLevelDetail(getLevelDetail);
        setIsLoading(false);
      })();

    return () => {
      setIsLoading(true)
    }
  }, [userId, currentUser]);



  return (
    <>
    { isLoading ? <CircularProgress /> : 
    
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

              {attendBadgeIdx >= 0 && <img src={`/badges/${11+attendBadgeIdx}.png`} alt=""
                className={classes.badge_image}/>
              }
              {/* <img src={'/badges/15.png'} alt="" className={classes.badge_image} /> */}
              {boardBadgeIdx >= 0 && <img src={`/badges/${21+boardBadgeIdx}.png`} alt=""
                className={classes.badge_image}/>
              }
              {commentBadgeIdx >= 0 && <img src={`/badges/${31+commentBadgeIdx}.png`} alt=""
                className={classes.badge_image}/>
              }
              {friendBadgeIdx >= 0 && <img src={`/badges/${41+friendBadgeIdx}.png`} alt=""
                className={classes.badge_image}/>
              }
              {popularBadgeIdx >= 0 && <img src={`/badges/${51+popularBadgeIdx}.png`} alt=""
                className={classes.badge_image}/>
              }
        </div>
      </div>
    }
    </>
  )
}


export default MyBadgeCollection


