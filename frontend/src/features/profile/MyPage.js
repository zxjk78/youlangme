import * as React from 'react';
// state

// redux

// router
import { useParams } from 'react-router-dom';



// component
import LeftProfile from './LeftProfile/LeftProfile';
import RightProfile from './RightProfile/RightProfile';

// data import


// css
import classes from './MyPage.module.scss';


// mui
import { Card } from '@mui/material';



const MyPage = () => {
  const params = useParams();

  return (
    <Card className={classes.profile_wrapper}>
      <LeftProfile userId={params.userId}/>
      <RightProfile userId={params.userId} />
    </Card>
  
  );
};

export default MyPage;
