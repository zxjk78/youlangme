import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

// mui
import { Card, CardContent, CardMedia, Typography, CardActionArea, Badge, Modal, 
  CardActions, IconButton, CircularProgress, Fab } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

// css
import classes from './RightProfile.module.scss'
import LevelStatistic from './LevelStatistic';

// data
import { LevelCriteria } from '../../../common/utils/data/Level';

// 리덕스 안거치는 단순 서버 통신 API
import { fetchLevelExp } from './RightProfileAPI';


const MyLevel = (props) => {
  const history = useHistory();
  const userId = props.userId;

  const [levelId, setLevelId] = useState(1);
  const [exp, setExp] = useState(0);
  const [trophyColor, setTrophyColor] = useState('')
  const [isLoading, setIsLoading] = useState(true); 

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);



  const levelModalHandler = () => {
    setOpen(true)
  }
      // "data": {
      //   "exp": 65,
      //   "levelId": 3,
      //   "levelName": "Bronze1"
      // }


  useEffect(() => {
    (
      async () => {
        const levelAndExp = await fetchLevelExp(userId);
        console.log(levelAndExp)
        if (!levelAndExp) {
          history.replace({
            pathname: '/404',
            message: '존재하지 않는 게시물입니다.',
          });
        }
        setLevelId(levelAndExp[0]);
        setExp(levelAndExp[1]);
        // console.log(levelAndExp[0], levelId)
        // setTrophyColor(LevelCriteria[levelId][2])
        setIsLoading(false);
      })();

    return () => {
      setIsLoading(true)
    }
  }, [userId]);

  return (
    <>
    { isLoading ? <CircularProgress /> :
      <div className={classes.level_container}>

        {/* 레벨 클릭하면 모달창!!!!!!!!!!!!!!!!!!!!!!!!!! */}
        <Typography gutterBottom color="#9BA7AF"
          sx={{
              // color: 'rgba(0, 0, 0, 0.6)',
              fontSize: 16,
              fontWeight: 'bold',
            }} component="div">
          내 레벨
        </Typography>

        <div className={classes.level_card}  
          // fullWidth
          // sx={{ m:1 }}
          >

          <Modal   
            open={open}
            onClose={handleClose}
          >
            <LevelStatistic setModalOpen={setOpen} 
              userId={userId}
              levelId={levelId} exp={exp} trophyColor={LevelCriteria[levelId][2]} detailLevelColor={LevelCriteria[levelId][3]}/>
          </Modal>

          <CardContent sx={{ height: 200, width: 320}}>
            {/* <IconButton onClick={levelModalHandler} sx={{ height: 170, width: 170}} > */}
              <div className={classes.level} onClick={levelModalHandler}>
                <div className={classes.trophy}>
                  <Badge badgeContent={LevelCriteria[levelId][1]} overlap="circular"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    sx={{ "& .MuiBadge-badge": { fontSize: 26 ,fontWeight: 'bold', height: 35, width: 35,
                    borderRadius: '50%', color: 'white',
                    backgroundColor: `${LevelCriteria[levelId][3]}` } }}
                    >
                    <EmojiEventsIcon sx={{ fontSize: 100, color: LevelCriteria[levelId][2]} } 
                    />
                  </Badge>

                </div>
                <div className={classes.level_name}>
                  <Typography gutterBottom color={LevelCriteria[levelId][2]} 
                    // variant="h6" 
                    component="span"
                    sx={{ fontSize: 35, fontWeight: 'bold', mx:'auto'}}
                    >
                    {LevelCriteria[levelId][0]}</Typography>

                </div>
                {/* <Typography gutterBottom color="#9BA7AF"
                  variant="h4" component="span"
                  sx={{ fontSize: 50, fontWeight: 'bold'}}
                  >
                  1</Typography> */}
              </div>
            {/* </IconButton> */}

          </CardContent>
        </div>
      </div>
    }
    </>

  )
}


export default MyLevel


