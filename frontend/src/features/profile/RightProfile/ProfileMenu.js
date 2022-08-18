import { Box, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import PrivateRoute from '../../../common/routes/PrivateRoute'
import ProfileBoardSummaryList from './profileBoardSummary/ProfileBoardSummaryList'
import RightProfile from './RightProfile'

// const activeStyle = {
//   fontWeight:'900',
//   color:'red',
//  }

function ProfileMenu({userId, onChangeTab}) {

  const [value, setValue] = useState('profile');
  const handleChange = (event, newValue) => {
    setValue(newValue);
    
    setTimeout(() => {
    onChangeTab(newValue);

    }, 200)
  };

  const tabFont = {
    fontSize: 15, 
    fontWeight: 800
  }


  return (
    <Box sx={{ width: '100%', mb:2, mx: 'auto'}}>
      <Tabs
        value={value}
        centered
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        variant="fullWidth"
        aria-label="secondary tabs example"
      >
        
        <Tab value="profile" label="프로필" sx={tabFont}>
          {/* <NavLink to={`/profile/${userId}`}></NavLink> */}
        </Tab>
        <Tab value="board" label="게시글"  sx={tabFont}>
          {/* <NavLink to={`/profile/${userId}/board`}></NavLink> */}
        </Tab>
      </Tabs>
    </Box>
    
  )
}

export default ProfileMenu