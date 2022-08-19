import React, { useState } from 'react';

import BadgeSelectList from './BadgeSelectList';

// data
import { badgeDetailList } from './BadgeDetailData';

// mui
import { IconButton, Modal, Box, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Build } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import { grey } from '@mui/material/colors';

// css
import classes from '../RightProfile.module.scss'

const BadgeEdit = (props) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const badgeEditModalHandler = () => {
    setOpen(true)
  }

  const activeBadgeEndIdxList = props.activeBadgeEndIdxList;
  // console.log(activeBadgeEndIdxList)



  const style = {
    position: 'absolute',
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 630,
    // maxHeight: 780,
    height: 630,
    fontWeight: 'bold',
    backgroundColor: 'background.paper',
    border: '3px solid #9BA7AF',
    borderRadius: 5,
    boxShadow: 24,
    px: 4, py: 2,
    overflow: 'scroll'
  };

  return (
    <>
      <IconButton sx={{ width: '30px', height: '30px', ml:1, mb:1}}
        onClick={badgeEditModalHandler}>
        <Build
          sx={{ fontSize: 17, color: grey[500] }}
        />
      </IconButton>

      <Modal   
        open={open}
        onClose={handleClose} 
      >       
        <Box sx={style}>
          <div className={classes.modal_header}>
            <Typography variant="button"
              sx={{ fontSize: 22, fontWeight: 'bold', mb:1}} component="span">
                {/* 프로필에 담을 배지를 선택해주세요. */}
                내가 획득한 배지
                {/* ({클릭개수?}/6) */}
              </Typography>
            <IconButton 
              onClick={() => setOpen(false)}
              sx={{ width: '35px', height: '35px'}}>
              <CancelIcon sx={{ color: grey[400], fontSize: 30 }} />
            </IconButton>
          </div>
          <div className={classes.badge_select_box}>
            {badgeDetailList.map((badge, idx, list) => {
              return (
                <BadgeSelectList
                  key={badge.name}
                  name={badge.name}
                  badgeBeginId={badge.imageBeginId}
                  badgeDesc={badge.desc}
                  badgeCriteria={badge.criteria}
                  activeBadgeEndIdx={activeBadgeEndIdxList[idx]}
                />
              )
            })}
          </div>

        </Box>
        
      </Modal>
</>
  );
};

export default BadgeEdit;