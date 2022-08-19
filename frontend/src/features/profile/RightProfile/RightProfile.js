import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'


// css
import classes from './RightProfile.module.scss';

import ProfileMenu from './ProfileMenu'
import RightProfileInfo from './RightProfileInfo';
import ProfileBoardSummaryList from './profileBoardSummary/ProfileBoardSummaryList';

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
          <ProfileBoardSummaryList userId={userId}/>
        }
      </div>    
    )
  }



export default RightProfile;