import Modal from '../../../../../common/UI/Modal/Modal';
import ImageDragNDrop from './ImageDragNDrop';
// redux
import { useDispatch } from 'react-redux';
import { modalActions } from '../../../../../common/UI/Modal/modalSlice';
// mui
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
// style
import classes from './BoardImageUploadModal.module.scss';
const BoardImageUploadModal = (props) => {
  const dispatch = useDispatch();
  const closeModalHandler = () => {
    dispatch(modalActions.offModal());
  };
  const loadImageFromModal = (files) => {
    props.loadImageFromModal(files);
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
            <div>
              <CloseIcon onClick={closeModalHandler} />
            </div>
          </div>
          <ImageDragNDrop loadImageFromModal={loadImageFromModal} />
        </div>
      </Modal>
    </>
  );
};

export default BoardImageUploadModal;
