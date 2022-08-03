import * as React from 'react';
// state

// redux

// router
import { NavLink, useParams } from 'react-router-dom';
import PrivateRoute from '../../common/routes/PrivateRoute';



// component
import LeftProfile from './LeftProfile/LeftProfile';
import RightProfile from './RightProfile/RightProfile';
import ProfileBoardSummeryList from './RightProfile/profileBoardSummery/ProfileBoardSummeryList';

// data import


// css
import classes from './MyPage.module.scss';


// mui
import { Card } from '@mui/material';
import ProfileMenu from './ProfileMenu';




const MyPage = () => {
  const params = useParams();

  return (
    <div>
      <Card className={classes.profile_wrapper}>
        <LeftProfile userId={params.userId}/>
        <ProfileMenu userId={params.userId}/>
        <RightProfile userId={params.userId}/>
        <div>
          {/* <PrivateRoute path={`/profile/${params.userId}`} exact component={RightProfile} /> */}
          {/* <PrivateRoute path='/profile/:userId/board' component={ProfileBoardSummeryList} />   */}
        </div>
        {/* <PrivateRoute path="/board" component={ProfileBoardSummeryList} />   */}
        {/* <PrivateRoute path={`/profile/${params.userId}/board`} component={ProfileBoardSummeryList} />   */}
      </Card>

      {/* <PrivateRoute path={`/profile/${params.userId}/board`} component={ProfileBoardSummeryList} />   */}
    </div>
  
  );
};

export default MyPage;
