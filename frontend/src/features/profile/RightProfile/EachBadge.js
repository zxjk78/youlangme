import React from 'react';

import { IconButton, Avatar } from '@mui/material';
// css
import classes from './RightProfile.module.scss'

const EachBadge = (props) => {
  return (

    <IconButton sx={{ height: 90, width: 90}} >
      
      <img src={`/badges/${props.badgeId}.png`} alt="" className={classes.modal_badge_image} />
    </IconButton>
  );
};

export default EachBadge;