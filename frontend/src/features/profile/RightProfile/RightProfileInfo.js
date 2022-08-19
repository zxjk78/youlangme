import React, { useEffect, useState } from 'react'

import MyLanguages from './MyLanguages'
import MyBadgeCollection from './Badges/MyBadgeCollection';
import MyGrass from './MyGrass';
import MyLevel from './MyLevel';


// css
import classes from './RightProfile.module.scss';


const RightProfileInfo = (props) => {

  const userId = props.userId
  
  return (
    <>
      <div className={classes.wrapper_level_activity}>
        <MyLevel userId={userId}/>
        <MyLanguages userId={userId} />
      </div>
      <MyBadgeCollection userId={userId}/>
      <MyGrass userId={userId}/>
    </>
  );
};

export default RightProfileInfo;