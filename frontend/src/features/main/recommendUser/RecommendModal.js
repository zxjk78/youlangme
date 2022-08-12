import Modal from '../../../common/UI/Modal/Modal';
import RecommendUserInfo from './RecommendUserInfo';

import classes from './RecommendModal.module.scss';
import { IconButton} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { grey } from '@mui/material/colors';
import { useState } from 'react';


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

const RecommendModal = (props) => {
  // const [isFollowBtnTouched, setIsFollowBtnTouched] = useState(false);
  
  const closeModal = () => {
    props.close();
    window.location.reload();
    // 팔로우 언팔로우 변경하면 모달 닫고 나서 오른쪽 아래에
    // 팔로우 추천 화면이 변화를 따라가지 못함.
    // 그리고 팔로우 취소했을때 피드에 내가 이제 팔로우 안하는 사람 글이 안떠야되는데
    // 그러려면 그냥 새로고침으로!

    // if (isFollowBtnTouched) {
    // }
  };

  // const getFollowChangeOrNot = (isChanged) => {
  //   if (isChanged) {
  //     return setIsFollowBtnTouched(true); 
      
  //   } else {
  //     setIsFollowBtnTouched(false)
  //   } 
  // }

  return (
    <>
      <Modal>
        <div className={classes.wrapper}>
          <div className={classes.container}>
            <div className={classes.header}>
              <div className={classes.header_ment}>팔로우 추천</div>
              <div>
                <IconButton
                  onClick={closeModal}
                  sx={{ width: '35px', height: '35px'}}>
                  <CancelIcon sx={{ color: grey[400], fontSize: 30 }} />
                </IconButton>
              </div>
            </div>
            <div className={classes.main}>
              {props.recommendList.map((reco) => (
                <div  className={classes.follow_user}>
                  <RecommendUserInfo
                    // onFollowChangeHandler={getFollowChangeOrNot}
                    userId={reco.followerId}
                    name={reco.name}
                    nationality={reco.nationality}
                    key={reco.followerId}
                  />
                </div>
              ))}
            </div>
            <div className={classes.footer}>

            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RecommendModal;
