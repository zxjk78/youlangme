import Modal from '../../../common/UI/Modal/Modal';
import RecommendUserInfo from './RecommendUserInfo';

import classes from './RecommendModal.module.scss';
import { IconButton} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { grey } from '@mui/material/colors';


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
  const closeModal = () => {
    props.close();
  };

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
                    id={reco.followerId}
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
