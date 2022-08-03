
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import MyActivity from './MyActivity';
import MyBadgeCollection from './MyBadgeCollection';
import MyGrass from './MyGrass';
import MyLevel from './MyLevel';




// css
import classes from './RightProfile.module.scss';


const RightProfile = (props) => {

  const userId = props.userId
  

    return (
      <>
        <div className={classes.right_profile}>
          
          <div className={classes.wrapper_level_activity}>
            <MyLevel userId={userId}/>
            <MyActivity />
          </div>
          <MyBadgeCollection />
          <MyGrass/>
        </div>    
      </>
    )
  }



export default RightProfile;