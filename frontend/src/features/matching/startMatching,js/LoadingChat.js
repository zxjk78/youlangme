import React, { useEffect, useState } from 'react';

// css
import classes from './StartMatch.module.scss'

//mui
import { Box } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  borderRadius: 10,
  // [`&.${linearProgressClasses.colorPrimary}`]: {
  //   backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 100 : 800],
  // },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#B865C6' 
    // theme.palette.mode === 'light' ? '#B865C6' : '#B865C6',
  },
}));


const LoadingChat = () => {
  // const [progress, setProgress] = useState(0);

  useEffect(()=> {
    // const timer = setInterval(() => {
    //   setProgress((oldProgress) => {
    //     if (oldProgress === 100) {
    //       return 0;
    //     }
    //     const diff = Math.random() * 10;
    //     return Math.min(oldProgress + diff, 100);
    //   });
    // },500);

    // return () => {
    //   clearInterval(timer);
    // };
  }, []);

  return (
    <div className={`${classes.match_wrapper} ${classes.intro_bg}`}>
      <div className={classes.loading_box}>
        <div className={classes.loading_ment}>최적의 상대를</div>
        <div className={classes.loading_ment}>찾고 있어요...!</div>
        <div className={classes.ring}>
          Loading
          <span className={classes.ring_side}></span>
        </div>
      </div>
      {/* <Box sx={{ width: '70%', height:'50px', mb: 5}}>
        <BorderLinearProgress color="secondary" 
          // value={progress} 
        />
      </Box> */}
    </div>

  );
};

export default LoadingChat;