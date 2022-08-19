import * as React from 'react';
// state

// redux

// router
import { NavLink, useParams } from 'react-router-dom';



// component
import LeftProfile from './LeftProfile/LeftProfile';
import ProfileBoardSummeryList from './RightProfile/profileBoardSummery/ProfileBoardSummeryList';

// data import


// css
import classes from './MyPage.module.scss';


// mui
import { Card } from '@mui/material';





const MyPageBoard = () => {
  const params = useParams();

  return (
    <Card className={classes.profile_wrapper}>
      <LeftProfile userId={params.userId}/>
      <ProfileBoardSummeryList />
      
    </Card>
  
  );
};

export default MyPageBoard;