import Modal from '../../../../../common/UI/Modal/Modal';
import ImageDragNDrop from './ImageDragNDrop';

// mui
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
// style
import classes from './BoardImageUploadModal.module.scss';
const BoardImageUploadModal = (props) => {
  const closeModalHandler = () => {
    props.closeModal();
  };
  const loadImageFromModal = (files) => {
    props.loadImageFromModal(files);
    props.closeModal();
  };
  return (
    <>
      <Modal backdropClickClose={false} backDropTransparent={true} imageUpload>
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
          <ImageDragNDrop
            loadImageFromModal={loadImageFromModal}
            imageCount={props.imageCount}
          />
        </div>
      </Modal>
    </>
  );
};

export default BoardImageUploadModal;
