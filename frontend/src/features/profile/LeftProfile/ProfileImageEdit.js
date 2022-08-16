import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { profileActions } from '../profileSlice';
// import { currentUser } from '../auth/authSlice';

import { API_URL, user, accessToken  } from "../../../common/api/http-config";

// css
import classes from "./ProfileEdit.module.scss";

// data
import { mainColors } from '../ProfileColorPalette'

// mui material
import { Avatar, Button, Modal, Box, Icon, Typography, IconButton, Stack, Badge } from "@mui/material";
import {  createTheme, ThemeProvider } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { grey } from '@mui/material/colors';


// 리덕스 안거치는 단순 서버 통신 API
import { uploadProfileImg } from './LeftProfileAPI';

// import defaultuser from './images/defaultuser.png'



const ProfileImageEdit = (props) => {

  const myTheme = createTheme({
    palette: mainColors
  });


  // redux
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // console.log(' 프로필 리덕스 테스트:', currentUser);

  const [open, setOpen] = useState(false);
  const profileUploadHandler = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const [profileImg, setProfileImg] = useState({
    profileImageFile: "",
    previewImageURL: "",
  });




  let inputRef;

  const saveProfileImage = (event) => {
    event.preventDefault();
    console.log( '저장:', event.target.files[0])

    if(event.target.files[0]){
      // 새로운 이미지를 올리면 createObjectURL()을 통해 생성한 기존 URL을 폐기
      URL.revokeObjectURL(profileImg.previewImageURL);
      const previewImageURL = URL.createObjectURL(event.target.files[0]);
      setProfileImg(() => (
        {
          profileImageFile: event.target.files[0],
          previewImageURL
        }
      ))
    }
  }
  
  const deleteImage = () => {
    // createObjectURL()을 통해 생성한 기존 URL을 폐기
    URL.revokeObjectURL(profileImg.previewImageURL);
    setProfileImg({
      profileImageFile: "",
      previewImageURL: "",
    });
    setOpen(false);
  }


  const sendImageToServer = async () => {
    
    await uploadProfileImg(profileImg.profileImageFile);
    // console.log('send이미지', profileImg.profileImageFile)
    // dispatch(profileActions.profileImgUpdate(profileImg.profileImageFile));
    setProfileImg({
      profileImageFile: '',
    })

    dispatch(profileActions.profileImgUpdate())
    // props.getNewProfileImg(true)
    setOpen(false);
  }

  useEffect(() => {
    // 컴포넌트가 언마운트되면 createObjectURL()을 통해 생성한 기존 URL을 폐기
    // fetchProfileImg(setProfileImg, params.userId);
    return () => {
      URL.revokeObjectURL(profileImg.previewImageURL)
      // URL.createObjectURL(profileImg.previewImageURL);
    }  
  }, [profileImg.previewImageURL]);
  
  


  const style = {
    position: 'absolute',
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    backgroundColor: 'background.paper',
    border: '3px solid #9BA7AF',
    borderRadius: 5,
    boxShadow: 24,
    px: 4, py: 2,
  };

  return (
    <ThemeProvider theme={myTheme}>
      {/* IconButton fontawesome으로 만들기 */}
      {/* <IconButton className={classes.add_profile_img} sx={{ color: green[500] }} onClick={profileUploadHandler}>add_circle</IconButton> */}
      <IconButton onClick={profileUploadHandler}  
        sx={{ width: '40px', height: '40px'}}
        className={classes.profile_img_add_icon}>
        <AddCircleIcon sx={{ color: grey[400], fontSize: 30 }} />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <input type="file" accept="image/*"
                onChange={saveProfileImage}
            // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
            // 사진 등록을 두개 띄우고 첫번째에 사진을 올리고 지우고 두번째에 같은 사진을 올리면 그 값이 남아있음!
                onClick={(event) => event.target.value = null}
                ref={refParam => inputRef = refParam}
                style={{display: "none"}}
          />

          <div className={classes.upload_profile_image}>
            <h3>프로필 사진 수정</h3>
            <Button color="mainPurple"  variant="text" className={classes.choose_file_btn}
              onClick={() => inputRef.click()}>파일 선택 
            </Button>
            <Avatar src={profileImg.previewImageURL} sx={{ width: 230, height: 230, mx: 'auto', my:3}} />
            <Stack direction='row-reverse' spacing={1} className={classes.upload_buttons}>
              <Button color="mainPurple" sx={{ color: "#F9F3EE" }}  variant="contained" onClick={sendImageToServer}>
                제출
              </Button>
              <Button color="mainGrey" variant="contained" sx={{ color: "#F9F3EE" }} onClick={deleteImage}>
                취소 
              </Button>
            </Stack>
          </div>
        </Box>
      </Modal>

      {/* <div className={classes.uploaderWrapper}>
        <input type="file" accept="image/*"
              onChange={saveProfileImage}
          // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
          // 사진 등록을 두개 띄우고 첫번째에 사진을 올리고 지우고 두번째에 같은 사진을 올리면 그 값이 남아있음!
              onClick={(event) => event.target.value = null}
              ref={refParam => inputRef = refParam}
              style={{display: "none"}}
        />
        <Button type="primary" onClick={() => 
          inputRef.click()}>
          사진 선택 
        </Button>

         <div className={classes.uploadButton}>
          <Avatar src={profileImg.previewImageURL} sx={{ width: 200, height: 200 }} alt="profile"/>
          <Button color="error" variant="contained" onClick={deleteImage}>
            취소 
          </Button>
          <Button color="success" variant="contained" onClick={sendImageToServer}>
            제출
          </Button>
        </div>
      </div> */}
    </ThemeProvider>
  );

};

export default ProfileImageEdit;




