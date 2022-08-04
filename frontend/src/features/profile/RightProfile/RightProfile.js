import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'


// css
import classes from './RightProfile.module.scss';

import ProfileMenu from './ProfileMenu'
import RightProfileInfo from './RightProfileInfo';
import ProfileBoardSummeryList from './profileBoardSummery/ProfileBoardSummeryList';

// const activeStyle = {
//   fontWeight:'900',
//   color:'red',
//  }

const RightProfile = (props) => {

  const userId = props.userId;
  const [tabValue, setTabValue] = useState('profile');

  const tabChangeHandler = (tab) => {
    setTabValue(tab);
  }

  
  return (
      <div className={classes.right_profile}>
        <ProfileMenu userId={userId} onChangeTab={tabChangeHandler}/>
        { tabValue === 'profile' ?
          <RightProfileInfo userId={userId}/> :
          <ProfileBoardSummeryList userId={userId}/>
        }


        {/* <div className={classes.wrapper_level_activity}>
          <MyLevel userId={userId}/>
          <MyActivity />
        </div>
        <MyBadgeCollection />
        <MyGrass/> */}
      </div>    
    )
  }



export default RightProfile;