import * as React from 'react';


// mui
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';


// css
import classes from './RightProfile.module.scss'

const MyBadgeCollection = (props) => {
  return (
    <div className={classes.badge_container}>

      {/* 레벨 클릭하면 모달창!!!!!!!!!!!!!!!!!!!!!!!!!! */}
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
            <div >
              <Typography gutterBottom 
              // color="#FFC700" 
              variant="h5" component="span">
                배지리스트 들어갈 자리!
              </Typography>
              {/* <Typography gutterBottom color="#9BA7AF" variant="h4" component="span">1</Typography> */}
            </div>
          </CardContent>
      </Card>
    </div>

  )
}


export default MyBadgeCollection


