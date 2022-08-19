import React from 'react';

// css
import classes from './LoadingChat.module.scss'


const LoadingChat = () => {

  
  return (
    <>
    <div className={classes.match_wrapper}>
      <div className={classes.container}>
        <div className={`${classes.dot} ${classes.dot_1}`}></div>
        <div className={`${classes.dot} ${classes.dot_2}`}></div>
        <div className={`${classes.dot} ${classes.dot_3}`}></div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"/>
          </filter>
        </defs>
      </svg>

      <div className={classes.loading_box}>
        <div className={classes.loading_ment}>최적의 상대를</div>
        <div className={classes.loading_ment}>찾고 있어요...!</div>
      </div>  
    </div>
    </>   
    
      // <div className={classes.loading_container}>
      //   <div className={classes.circle}></div>
      //   <div className={classes.square}></div>
      //   <div className={classes.triangle}></div>
      //   <div className={classes.logo}></div>
      //   <div className={classes.shadow}></div>
      // </div> 

  );
};

export default LoadingChat;