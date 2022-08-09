import React, { useState } from 'react';

import BadgeSelectList from './BadgeSelectList';

// mui
import { IconButton, Modal, Box, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Build } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import { grey } from '@mui/material/colors';

// css
import classes from './RightProfile.module.scss'

const BadgeEdit = (props) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const badgeEditModalHandler = () => {
    setOpen(true)
  }

  const badgeDetailList = [
    {'name' : '출석', 'imageBeginId' : 11, 'desc': '출석',
      'criteria': ['1일', '3일', '10일', '30일', '365일']
    },
    {'name' : '게시글', 'imageBeginId' : 21, 'desc': '게시글 작성',
      'criteria': ['1회', '5회', '10회', '30회', '100회']
    },
    {'name' : '댓글', 'imageBeginId' : 31, 'desc': '댓글 작성',
      'criteria': ['1회', '10회', '50회', '100회', '200회']
    },
    {'name' : '언어교류', 'imageBeginId' : 41, 'desc': '언어 교류 매칭',
      'criteria': ['1회', '3회', '10회', '30회', '50회']
    },
    {'name' : '인기', 'imageBeginId' : 51, 'desc': '팔로워 수',
      'criteria': ['1명', '5명', '10명', '50명', '100명']
    },
  ]


  const style = {
    position: 'absolute',
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    maxHeight: 780,
    fontWeight: 'bold',
    backgroundColor: 'background.paper',
    border: '3px solid #9BA7AF',
    borderRadius: 5,
    boxShadow: 24,
    px: 4, py: 2,
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
                프로필에 담을 배지를 선택해주세요.
                {/* ({클릭개수?}/6) */}
              </Typography>
            <IconButton 
              onClick={() => setOpen(false)}
              sx={{ width: '35px', height: '35px'}}>
              <CancelIcon sx={{ color: grey[400], fontSize: 30 }} />
            </IconButton>
          </div>
          <div className={classes.badge_select_box}>
            {badgeDetailList.map(badge => {
              return (
                <BadgeSelectList
                  key={badge.name}
                  name={badge.name}
                  badgeBeginId={badge.imageBeginId}
                  badgeDesc={badge.desc}
                  badgeCriteria={badge.criteria}
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