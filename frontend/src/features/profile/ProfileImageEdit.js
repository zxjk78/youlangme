import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
// import { currentUser } from '../auth/authSlice';

// css
import classes from "./ProfileImageEdit.module.scss";
import { Avatar, Button, Modal, Box, Typography } from "@mui/material";



// 리덕스 안거치는 단순 서버 통신 API
import { UploadProfileImg } from './ProfileAPI';

import defaultuser from './images/defaultuser.png'



const ProfileImageEdit = () => {
  // redux
  const { currentUser } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();
  // console.log(' 프로필 리덕스 테스트:', currentUser);
  
  const [open, setOpen] = useState(false);
  const profileUploadHandler = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const [profileImg, setProfileImg] = useState({
    profileImageFile: "",
    previewImageURL: defaultuser,
  });

  const [isUploadClicked, setIsUploadClicked] = useState(false)


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
      previewImageURL: defaultuser,
    });
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

  
  const sendImageToServer = () => {
    
    UploadProfileImg(profileImg.profileImageFile, setProfileImg);
    setOpen(false);
  }


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
      <Button type="primary" variant="outlined" onClick={profileUploadHandler}>프로필 사진 업로드</Button>

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
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
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
    </>
  );

};

export default ProfileImageEdit;




