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
      <Typography gutterBottom color="#9BA7AF" variant="h5" component="div">
        내 레벨
      </Typography>

      <Card className={classes.level_card}  
        // fullWidth
        sx={{ m:4 }}>
        <CardActionArea>
          <CardContent sx={{ height: '200px'}}>
            <EmojiEventsIcon sx={{ fontSize: 80, color: '#FFC700' }} className={classes.trophy} />
            <div className={classes.level}>
              <Typography gutterBottom color="#9BA7AF" variant="h3" component="span">Lv.</Typography>
              <Typography gutterBottom color="#FFC700" variant="h3" component="span">36</Typography>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>

  )
}


export default MyLevel


