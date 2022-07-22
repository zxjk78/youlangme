import Modal from '../../../../common/UI/Modal/Modal';
// redux
import { useDispatch } from 'react-redux';
import { modalActions } from '../../../../common/UI/Modal/modalSlice';
// mui
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CloseIcon from '@mui/icons-material/Close';
// style
import classes from './BoardImageUploadModal.module.scss';
const BoardImageUploadModal = (props) => {
  const dispatch = useDispatch();
  const closeModalHandler = () => {
    dispatch(modalActions.offModal());
  };

  return (
    <>
      <Modal>
        <div className={classes.container}>
          <div className={classes.title}>
            <div>
              <AddPhotoAlternateIcon />
              <div>이미지 업로드</div>
            </div>
            <CloseIcon onClick={closeModalHandler} />
          </div>
          <div>
            <button type="button">+ 파일 선택</button>
          </div>
          <div className={classes.uploadBoxWrapper}>
            <div className={classes.uploadBoxContainer}>
              <CloudUploadOutlinedIcon />
              <div>
                <p>이미지를 드래그 앤 드롭으로 올릴 수 있습니다.</p>
                <p>이미지는 최대 10장까지 업로드 가능합니다.</p>
              </div>
            </div>
          </div>
          <button className={classes.uploadBtn} type="button">
            업로드
          </button>
        </div>
      </Modal>
    </>
  );
};

export default BoardImageUploadModal;
