import * as React from 'react';


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
  return (
    <div className={classes.badge_container}>

      <Typography gutterBottom color="#9BA7AF"
        sx={{
            // color: 'rgba(0, 0, 0, 0.6)',
            fontSize: 16,
            fontWeight: 'bold',
          }} component="div">
        내 배지
      </Typography>

      <Card className={classes.badge_card}  
        fullWidth
        sx={{ m:1 }}
        >
          <CardContent>
            <img src={attendTestBadge} alt="" className={classes.badge_image} />
            <img src={writerTestBadge} alt="" className={classes.badge_image}/>
            <img src={followersTestBadge} alt="" className={classes.badge_image}/>
            <img src={commentTestBadge} alt="" className={classes.badge_image}/>
            <img src={chattingTestBadge} alt="" className={classes.badge_image}/>
            {/* <div >
              <Typography gutterBottom 
              // color="#FFC700" 
              variant="h5" component="span">
                배지리스트 들어갈 자리!
              </Typography>
            </div> */}
          </CardContent>
      </Card>
    </div>

  )
}


export default MyBadgeCollection


