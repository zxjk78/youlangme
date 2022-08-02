import * as React from 'react';


// mui
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

// css
import classes from './RightProfile.module.scss'

const MyLevel = (props) => {
  return (
    <div className={classes.container}>

      {/* 레벨 클릭하면 모달창!!!!!!!!!!!!!!!!!!!!!!!!!! */}
      <Typography gutterBottom color="#9BA7AF" variant="h6" component="div">
        내 레벨
      </Typography>

      <Card className={classes.level_card}  
        // fullWidth
        sx={{ m:1 }}>
        <CardActionArea>
          <CardContent sx={{ height: 300}} className={classes.level} >
            <EmojiEventsIcon sx={{ fontSize: 140, color: '#FFC700' }} className={classes.trophy} />
            <div >
              <Typography gutterBottom color="#FFC700" variant="h2" component="span">GOLD</Typography>
              <Typography gutterBottom color="#9BA7AF" variant="h4" component="span">1</Typography>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>

  )
}


export default MyLevel


