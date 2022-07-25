import React, { useEffect, useState } from "react";

// css
import classes from "./ProfileImage.module.scss";
import { Button } from "@mui/material";



// 리덕스 안거치는 단순 서버 통신 API
import { UploadProfileImg } from './ProfileAPI';

import defaultuser from './images/defaultuser.png'



const ProfileImage = () => {
  const [profileImg, setProfileImg] = useState({
    profileImageFile: "",
    previewImageURL: defaultuser,
  });


  let inputRef;

  const saveProfileImage = (event) => {
    event.preventDefault();
    console.log(event.target)

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
  }

  useEffect(() => {
    // 컴포넌트가 언마운트되면 createObjectURL()을 통해 생성한 기존 URL을 폐기
    // fetchProfileImg(setProfileImg, params.userId);
    return () => {
      URL.revokeObjectURL(profileImg.previewImageURL)
    }  
  }, []);

  
  const sendImageToServer = () => {
    return UploadProfileImg(profileImg.profileImageFile, setProfileImg);
  }

  return (
    <div className={classes.uploaderWrapper}>
      <input type="file" accept="image/*"
             onChange={saveProfileImage}
        // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
        // 사진 등록을 두개 띄우고 첫번째에 사진을 올리고 지우고 두번째에 같은 사진을 올리면 그 값이 남아있음!
             onClick={(event) => event.target.value = null}
             ref={refParam => inputRef = refParam}
             style={{display: "none"}}
      />
      <div className={classes.imgWrapper}>
        <img src={profileImg.previewImageURL} alt="profile"/>
      </div>

      <div className={classes.uploadButton}>
        <Button type="primary" variant="contained" onClick={() => inputRef.click()}>
          Preview
        </Button>
        <Button color="error" variant="contained" onClick={deleteImage}>
          Delete
        </Button>
        <Button color="success" variant="contained" onClick={sendImageToServer}>
          Upload
        </Button>
      </div>
    </div>
  );

  // return (
    
  //   <>
  //     <input type="file" accept='image/*' />
  //     <div>
  //       {profileImg && <img src={profileImg} alt="프로필 이미지" />}

  //     </div>
      
  //   </>
  // );
};

export default ProfileImage;




