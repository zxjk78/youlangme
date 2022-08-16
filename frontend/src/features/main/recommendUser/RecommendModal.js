import Modal from '../../../common/UI/Modal/Modal';
import RecommendUserInfo from './RecommendUserInfo';

import { IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import styled from '@emotion/styled';
import { grey } from '@mui/material/colors';

import classes from './RecommendModal.module.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 360,
  fontWeight: 'bold',
  backgroundColor: 'background.paper',
  border: '3px solid #9BA7AF',
  borderRadius: 5,
  boxShadow: 24,
  px: 4,
  py: 2,
};

const CustomCancel = styled(CancelIcon)`
  color: #fff;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const RecommendModal = (props) => {
  const closeModal = () => {
    // props.close();
    window.location.reload();
    // 팔로우 언팔로우 변경하면 모달 닫고 나서 오른쪽 아래에
    // 팔로우 추천 화면이 변화를 따라가지 못함.
    // 그리고 팔로우 취소했을때 피드에 내가 이제 팔로우 안하는 사람 글이 안떠야되는데
    // 그러려면 그냥 새로고침으로!
  };

  // }

  return (
    <>
      <Modal>
        <div className={classes.wrapper}>
          <div className={classes.container}>
            <div className={classes.header}>
              <div className={classes.header_ment}>팔로우 추천</div>
              <div>
                <div onClick={closeModal}>
                  <CustomCancel />
                </div>
              </div>
            </div>
            <div className={classes.main}>
              {props.recommendList.map((item) => (
                <div className={classes.follow_user}>
                  <RecommendUserInfo
                    // onFollowChangeHandler={getFollowChangeOrNot}
                    userId={item.userId}
                    userName={item.userName}
                    key={item.userId}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RecommendModal;
