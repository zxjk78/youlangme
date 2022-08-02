import React, { useState } from 'react';

// mui
import { Card, CardContent, CardMedia, Typography, CardActionArea, Badge, Modal, CardActions, IconButton } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

// css
import classes from './RightProfile.module.scss'
import LevelStatistic from './LevelStatistic';



const MyLevel = (props) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const levelModalHandler = () => {
    setOpen(true)
  }

  return (
    <div className={classes.container}>

      {/* 레벨 클릭하면 모달창!!!!!!!!!!!!!!!!!!!!!!!!!! */}
      <Typography gutterBottom color="#9BA7AF" variant="h6" component="div">
        내 레벨
      </Typography>

      <div className={classes.level_card}  
        // fullWidth
        sx={{ m:1 }}>

        <Modal   
          open={open}
          onClose={handleClose}
        >
          <LevelStatistic setModalOpen={setOpen}/>
        </Modal>

        <CardContent sx={{ height: 300}} className={classes.level} >
          <IconButton onClick={levelModalHandler}>
            <div>
              <Badge badgeContent={1} overlap="circular"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                sx={{ "& .MuiBadge-badge": { fontSize: 25,fontWeight: 'bold', height: 40, width: 40,
                borderRadius: '50%', color: 'white',
                backgroundColor: '#686868', }}}
                >
                <EmojiEventsIcon sx={{ fontSize: 140, color: '#FFC700' }} className={classes.trophy} />
              </Badge>
              <Typography gutterBottom color="#FFC700" 
                // variant="h6" 
                component="span"
                sx={{ fontSize: 50, fontWeight: 'bold', mr:2}}
                >
                GOLD</Typography>
              {/* <Typography gutterBottom color="#9BA7AF"
                variant="h4" component="span"
                sx={{ fontSize: 50, fontWeight: 'bold'}}
                >
                1</Typography> */}
            </div>
          </IconButton>

        </CardContent>
      </div>
    </div>

  )
}


export default MyLevel


