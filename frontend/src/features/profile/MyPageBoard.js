import * as React from 'react';
// state

// redux

// router
import { NavLink, useParams } from 'react-router-dom';



// component
import LeftProfile from './LeftProfile/LeftProfile';
import RightProfile from './RightProfile/RightProfile';

// data import


// css
import classes from './MyPage.module.scss';


// mui
import { Card } from '@mui/material';


const activeStyle = {
  fontWeight:'900',
  color:'red',
 }



const MyPageBoard = () => {
  const params = useParams();

  return (
    <Card className={classes.profile_wrapper}>
      <LeftProfile userId={params.userId}/>
      {/* <RightProfile userId={params.userId} /> */}
      <div>

        {/* <NavLink to={`/profile/${params.userId}/activity`} activeStyle={activeStyle}>프로필
        </NavLink>
        <NavLink  to={`/profile/${params.userId}/board`} activeStyle={activeStyle}>게시글</NavLink> */}
      </div>
      
    </Card>
  
  );
};

export default MyPageBoard;
