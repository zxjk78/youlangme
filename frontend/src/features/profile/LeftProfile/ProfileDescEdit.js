import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
// import { currentUser } from '../auth/authSlice';

// css
import classes from "./ProfileEdit.module.scss";

// data
import { mainColors } from '../ProfileColorPalette'

// mui material
import { Avatar, Button, Modal, Box, Icon, Typography, IconButton, TextField, Stack } from "@mui/material";
import {  createTheme, ThemeProvider } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import { grey } from '@mui/material/colors';


// 리덕스 안거치는 단순 서버 통신 API
import { submitDescription } from './LeftProfileAPI';



const ProfileDescEdit = (props) => {
  const myTheme = createTheme({
    palette: mainColors
  });

  // redux
  const { currentUser } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();
  // console.log(' 프로필 리덕스 테스트:', currentUser);


  const description = props.desc;

  const [open, setOpen] = useState(false);
  const descUploadHandler = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isDescTouched, setIsDescTouched] = useState(false);
  const [ profileDesc, setProfileDesc ] = useState(description || '');
  
  // const [profileImg, setProfileImg] = useState({
  //   profileImageFile: "",
  //   previewImageURL: "",
  // });
  
  const descInputChangeHandler = (event) => {
    // console.log( '자기소개 제출:', event.target.value)
    setIsDescTouched(true)
    setProfileDesc(event.target.value);
  }

  const onDescSubmitHandler = () => {
    if (isDescTouched) {
      submitDescription(profileDesc)
    } else {
      submitDescription(description)
    }
    // console.log( '자기소개 제출2:', profileDesc)
    setOpen(false)
    props.getNewProfileDesc(true)
  }



  

  const style = {
    position: 'absolute',
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 360,
    fontWeight: 'bold',
    backgroundColor: 'background.paper',
    border: '3px solid #9BA7AF',
    borderRadius: 5,
    boxShadow: 24,
    px: 4, py: 2,
  };

  

  return (
    <>
      {/* IconButton fontawesome으로 만들기 */}
      {/* <IconButton className={classes.add_profile_img} sx={{ color: green[500] }} onClick={profileUploadHandler}>add_circle</IconButton> */}
      <IconButton onClick={descUploadHandler} sx={{ width: '35px', height: '35px'}}>
        <EditIcon sx={{ color: grey[400], fontSize: 20 }} />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3>자기소개 수정</h3>
          <br />
          <TextField
            id="description"
            placeholder="자기소개를 작성해주세요!"
            multiline fullWidth
            minRows={10} margin='dense'
            defaultValue={description}
            variant="filled"
            color="info"
            onChange={descInputChangeHandler}
          />
          <ThemeProvider theme={myTheme}>
            <Stack direction='row-reverse' spacing={1} className={classes.upload_buttons}>
              <Button onClick={onDescSubmitHandler} color="mainPurple" sx={{ color: "#F9F3EE" }} variant="contained" >
                업로드
              </Button>
              <Button onClick={handleClose} color="mainGrey" sx={{ color: "#F9F3EE" }} variant="contained" >
                취소
              </Button>
            </Stack>
          </ThemeProvider>
        </Box>
      </Modal>
    </>
  )
};

export default ProfileDescEdit;