import React from 'react';

import EachBadge from './EachBadge';

// css
import classes from './RightProfile.module.scss'

// mui
import { IconButton, Stack, Typography } from '@mui/material';



const BadgeSelectList = (props) => {
  const name = props.name;
  const badgeDesc= props.badgeDesc;
  const badgeCriteria = props.badgeCriteria;
  const badgeBeginId = props.badgeBeginId;
  // const range = (start, end) => {
  //   let array = [];
  //   for (let i = start; i < end; ++i) {
  //     array.push(i);
  //   }
  //   return array;
  // }
  const range = (start, cnt) => {
    let array = [];
    while (cnt--) {
      array.push(start++);

    }
    return array;
  }

  const badgeIdList = range(badgeBeginId, 5);
  // const badgeIdList = range(badgeBeginId, badgeBeginId+5);
  // console.log(badgeIdList)


  return (
    <div className={classes.each_badge_list}>
      <Typography gutterBottom color="#9BA7AF" 
        component="div"
        sx={{ fontSize: 17, fontWeight: 'bold', ml:1}}
        >
        {name}
      </Typography>

          {/* <img src={'/badges/attend_15.png'} alt="" className={classes.badge_image} /> */}

        {/* {[0, 1, 2, 3, 4].map( idx => {

        <EachBadge 
          key = {idx}
          badgeId={badgeBeginId}/>
        }
      )} */}
      
      <Stack direction="row" spacing={2} sx={{ml:4, mt:1}}>
        <IconButton sx={{ height: 90, width: 90}} >
          <img src={`/badges/${badgeBeginId}.png`} alt="" className={classes.modal_badge_image} />
        </IconButton>
        <IconButton sx={{ height: 90, width: 90}} >
          <img src={`/badges/${badgeBeginId+1}.png`} alt="" className={classes.modal_badge_image} />
        </IconButton>
        <IconButton sx={{ height: 90, width: 90}} >
          <img src={`/badges/${badgeBeginId+2}.png`} alt="" className={classes.modal_badge_image} />
        </IconButton>
        <IconButton sx={{ height: 90, width: 90}} >
          <img src={`/badges/${badgeBeginId+3}.png`} alt="" className={classes.modal_badge_image} />
        </IconButton>
        <IconButton sx={{ height: 90, width: 90}} >
          <img src={`/badges/${badgeBeginId+4}.png`} alt="" className={classes.modal_badge_image} />
        </IconButton>
      </Stack>
      
    </div>
  );
};

export default BadgeSelectList;