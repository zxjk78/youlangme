import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
// import { currentUser } from '../auth/authSlice';

// css
import classes from "./ProfileImageEdit.module.scss";

// mui material
import { Avatar, Button, Modal, Box, Icon, Typography, IconButton, TextField } from "@mui/material";
import { green } from '@mui/material/colors';


// 리덕스 안거치는 단순 서버 통신 API
import { submitDescription } from './ProfileAPI';



const ProfileDescEdit = (props) => {
  // redux
  const { currentUser } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();
  // console.log(' 프로필 리덕스 테스트:', currentUser);
  const API_URL = 'http://127.0.0.1:8080/';
  
  let descRef;

  const description = props.desc;


  const [open, setOpen] = useState(false);
  const descUploadHandler = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [ profileDesc, setProfileDesc ] = useState(description || '');
  
  // const [profileImg, setProfileImg] = useState({
  //   profileImageFile: "",
  //   previewImageURL: "",
  // });
  
  const descInputChangeHandler = (event) => {
    console.log( '자기소개 제출:', event.target.value)
    setProfileDesc(event.target.value);
  }

  const onDescSubmitHandler = () => {
    submitDescription(profileDesc)
    console.log( '자기소개 제출:', profileDesc)
    setOpen(false)
    props.getNewProfileDesc(true)
  }


    

  // useEffect(() => {
  // }, []);
  
  

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };


  return (
    <>
      {/* IconButton fontawesome으로 만들기 */}
      {/* <IconButton className={classes.add_profile_img} sx={{ color: green[500] }} onClick={profileUploadHandler}>add_circle</IconButton> */}
      <Icon className={classes.add_profile_img} sx={{ color: green[500] }} onClick={descUploadHandler}>add_circle</Icon>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3>자기소개 작성</h3>
          <TextField
            id="description"
            placeholder="자기소개를 작성해주세요!"
            multiline
            // rows={4}
            defaultValue= {description} 
            ref={descRef}
            variant="filled"
            onChange={descInputChangeHandler}
          />
            <Button color="success" variant="contained" onClick={onDescSubmitHandler} >
              업로드
            </Button>
        </Box>
      </Modal>
    </>
  )
};

export default ProfileDescEdit;