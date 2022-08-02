import * as React from 'react';


// mui
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';


// css
import classes from './RightProfile.module.scss'

const MyGrass = (props) => {
  return (
    <div className={classes.grass_container}>

      {/* 레벨 클릭하면 모달창!!!!!!!!!!!!!!!!!!!!!!!!!! */}
      <Typography gutterBottom color="#9BA7AF" variant="h6" component="div">
        나의 출석 일수
      </Typography>

      <Card className={classes.grass_card}  
        fullWidth
        sx={{ m:1 }}
        >
          <CardContent>
            <div >
              <Typography gutterBottom 
              // color="#FFC700" 
              variant="h5" component="span">
                잔디 들어갈 자리!
              </Typography>
              {/* <Typography gutterBottom color="#9BA7AF" variant="h4" component="span">1</Typography> */}
            </div>
          </CardContent>
      </Card>
    </div>

  )
}


export default MyGrass
