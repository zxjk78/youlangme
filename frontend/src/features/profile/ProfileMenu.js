import React from 'react'
import { NavLink } from 'react-router-dom'
import PrivateRoute from '../../common/routes/PrivateRoute'
import ProfileBoardSummeryList from './RightProfile/profileBoardSummery/ProfileBoardSummeryList'
import RightProfile from './RightProfile/RightProfile'

const activeStyle = {
  fontWeight:'900',
  color:'red',
 }

function ProfileMenu({userId}) {
  return (
    <div>
      <li>
        <NavLink to={`/profile/${userId}`} exact activeStyle={activeStyle}>프로필
          {/* <RightProfile userId={params.userId} /> */}
        </NavLink>
    
      </li>
      <li>
        <NavLink  to={`/profile/${userId}/board`} activeStyle={activeStyle}>
          게시글
          
        </NavLink>
      </li>
      {/* <PrivateRoute path='/profile/:userId/board' component={ProfileBoardSummeryList} />   */}
    </div>
    
  )
}

export default ProfileMenu