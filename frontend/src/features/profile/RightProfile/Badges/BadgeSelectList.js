import React from 'react';
import { useState } from 'react';

import ActiveBadge from './ActiveBadge';
import DisabledBadge from './DisabledBadge';

// css
import classes from '../RightProfile.module.scss'

// mui
import { IconButton, Stack, Typography } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';


const BadgeTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({

    [`& .${tooltipClasses.tooltip}`]: {

      // backgroundColor: theme.palette.common.black,
      // color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[5],
      // borderRadius: 15,
      fontSize: 13,
      padding: '5px 13px 5px 13px',
    },
  }));

const BadgeSelectList = (props) => {
  const name = props.name;
  const badgeDesc= props.badgeDesc;
  const badgeCriteria = props.badgeCriteria;
  const badgeBeginId = props.badgeBeginId;
  const activeBadgeEndIdx = props.activeBadgeEndIdx;

  const unit = name ==='인기' ? '명' : '회';
  const badgeActive = true;

  // const [unit, setUnit] = useState('회');
  // if (name === '출석') {
  //   setUnit('일');
  // } else if (name === '인기') {
  //   setUnit('명')
  // }
  

//   const range = (start, cnt) => {
//     let array = [];
//     while (cnt--) {
//       array.push(start++);

//     }
//     return array;
//   }
// // 
//   const badgeIdList = range(badgeBeginId, 5);
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

      <Stack direction="row" spacing={2} sx={{ml:4, mt:1}}>
        {[0, 1, 2, 3, 4].map((Idx) => (
          Idx <= activeBadgeEndIdx ? 
          <ActiveBadge badgeId={badgeBeginId+Idx} key={Idx} title={`${badgeDesc} ${badgeCriteria[Idx]}${unit} 이상`}/>
          : <DisabledBadge badgeId={badgeBeginId+Idx} key={Idx} title={`${badgeDesc} ${badgeCriteria[Idx]}${unit} 이상`}/>

          ))}

        {/* <ActiveBadge badgeId={badgeBeginId} title={`${badgeDesc} ${badgeCriteria[0]}${unit} 이상`}/>
        <ActiveBadge badgeId={badgeBeginId+1} title={`${badgeDesc} ${badgeCriteria[1]}${unit} 이상`}/>
        <ActiveBadge badgeId={badgeBeginId+2} title={`${badgeDesc} ${badgeCriteria[2]}${unit} 이상`}/>
        <ActiveBadge badgeId={badgeBeginId+3} title={`${badgeDesc} ${badgeCriteria[3]}${unit} 이상`}/>
        <DisabledBadge badgeId={badgeBeginId+4} title={`${badgeDesc} ${badgeCriteria[4]}${unit} 이상`}/> */}


        {/* <BadgeTooltip title={`${badgeDesc} ${badgeCriteria[0]}${unit} 이상`}
          placement="top"
          arrow
          >
          <IconButton sx={{ height: 90, width: 90, }}>
            <img src={`/badges/${badgeBeginId}.png`} alt="" className={classes.modal_badge_image} />
          </IconButton>
        </BadgeTooltip>

        <BadgeTooltip title={`${badgeDesc} ${badgeCriteria[1]}${unit} 이상`}
          placement="top"
          arrow
          >
          <IconButton sx={{ height: 90, width: 90}} >
            <img src={`/badges/${badgeBeginId+1}.png`} alt="" className={classes.modal_badge_image} />
          </IconButton>
        </BadgeTooltip>

        <BadgeTooltip title={`${badgeDesc} ${badgeCriteria[2]}${unit} 이상`}
          placement="top"
          arrow
          >
          <IconButton sx={{ height: 90, width: 90}} >
            <img src={`/badges/${badgeBeginId+2}.png`} alt="" className={classes.modal_badge_image} />
          </IconButton>
  
        </BadgeTooltip>

        <BadgeTooltip title={`${badgeDesc} ${badgeCriteria[3]}${unit} 이상`}
          placement="top"
          arrow
          >
          <IconButton sx={{ height: 90, width: 90}} >
            <img src={`/badges/${badgeBeginId+3}.png`} alt="" className={classes.modal_badge_image} />
          </IconButton>
        </BadgeTooltip>
         */}

        {/* <BadgeTooltip title={`${badgeDesc} ${badgeCriteria[4]}${unit} 이상`}
          placement="top"
          arrow
          > */}
            
          {/* disable일때 tooltip 띄우려면 span태그로 감싸줘야함. */}
          {/* <span>
            <IconButton sx={{ height: 90, width: 90}}  disabled  >
              <img src={`/badges/${badgeBeginId+4}.png`} alt="" className={`${classes.modal_badge_image} ${classes.disabled}`} />
            </IconButton>
          </span> */}
        {/* </BadgeTooltip> */}
        
      </Stack>
    </div>
  );
};

export default BadgeSelectList;