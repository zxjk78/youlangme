// Custom components
import PhotoCarousel2 from '../PhotoCarousel/PhotoCarousel2';

// External components
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import PhotoIcon from '@mui/icons-material/Photo';
import styled from '@emotion/styled';
// css
import classes from './PhotoModal.module.scss';
const CustomBox = styled(Box)`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 400px;
  background-color: #000;
  border-radius: 15px;
  box-shadow: 24px;
`;

const CustomPhotoBox = styled(Box)`
  padding: 10px 0px;
`;

const PhotoModal = (props) => {
  const userName = props.userName;
  const pictures = props.pics;
  console.log(pictures);

  const closeHandler = () => {
    props.close();
  };

  return (
    <Modal
      open={props.open}
      onClose={closeHandler}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <CustomBox>
        <div className={classes.header}>
          <PhotoIcon />
          <div>{userName} 님의 사진</div>
        </div>

        <CustomPhotoBox>
          <PhotoCarousel2 pics={pictures} />
        </CustomPhotoBox>
      </CustomBox>
    </Modal>
  );
};

export default PhotoModal;
