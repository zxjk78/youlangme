import { Box, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import PrivateRoute from '../../common/routes/PrivateRoute'
import ProfileBoardSummeryList from './RightProfile/profileBoardSummery/ProfileBoardSummeryList'
import RightProfile from './RightProfile/RightProfile'

const activeStyle = {
  fontWeight:'900',
  color:'red',
 }

function ProfileMenu({userId}) {

  const [value, setValue] = useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="프로필">
          <NavLink to={`/profile/${userId}`} exact activeStyle={activeStyle}>
          프로필 </NavLink>
        </Tab>
        <Tab value="two" label="게시글">
          <NavLink to={`/profile/${userId}/board`} exact activeStyle={activeStyle} />
        </Tab>
      </Tabs>
    </Box>
      // <li>
    
      // </li>
      // <li>
      //   <NavLink  to={`/profile/${userId}/board`} activeStyle={activeStyle}>
      //     게시글
          
      //   </NavLink>
      // </li>
      /* <PrivateRoute path='/profile/:userId/board' component={ProfileBoardSummeryList} />   */
    
  )
}

export default ProfileMenu