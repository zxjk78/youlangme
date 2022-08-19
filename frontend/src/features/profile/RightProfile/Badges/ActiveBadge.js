import React from 'react';


// mui
import { IconButton } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';


// css
import classes from '../RightProfile.module.scss'

const BadgeTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({

    [`& .${tooltipClasses.tooltip}`]: {

      boxShadow: theme.shadows[5],
      fontSize: 13,
      padding: '5px 13px 5px 13px',
    },
  }));




const ActiveBadge = ({badgeId, title}) => {
  // const badgeBeginId = props.badgeBeginId;

  const badgeChooseHandler = () => {
    
  }

  return (
    <>        
    <BadgeTooltip title={title}
    placement="top"
    arrow
    > 
      
      {/* disable일때 tooltip 띄우려면 span태그로 감싸줘야함. */}

      {/* <IconButton sx={{ height: 90, width: 90}} onClick={badgeChooseHandler}> */}
      <div onClick={badgeChooseHandler}>
        <img src={`/badges/${badgeId}.png`} alt="" className={`${classes.modal_badge_image} ${classes.active}`}/>
      
      </div>  
      {/* </IconButton> */}

  
    </BadgeTooltip>
  
    </>
  );
};

export default ActiveBadge;