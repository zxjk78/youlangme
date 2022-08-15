import * as React from 'react';
// state

// redux

// router
import { NavLink, useParams } from 'react-router-dom';
import PrivateRoute from '../../common/routes/PrivateRoute';



// component
import LeftProfile from './LeftProfile/LeftProfile';
import RightProfile from './RightProfile/RightProfile';
import ProfileBoardSummaryList from './RightProfile/profileBoardSummary/ProfileBoardSummaryList';

// data import


// css
// import classes from './MyPage.module.scss';
import '../../index.css';


// mui
import { Card } from '@mui/material';




const MyPage = () => {
  const params = useParams();

  return (
    <div>
      {/* <Card className={classes.profile_wrapper}> */}
      <Card class='main_wrapper'>
        <LeftProfile userId={params.userId}/>
        <RightProfile userId={params.userId}/>
      </Card>

      {/* <PrivateRoute path={`/profile/${params.userId}/board`} component={ProfileBoardSummaryList} />   */}
    </div>
  
  );
};

export default MyPage;
