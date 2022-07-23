import { useRef, useState } from 'react';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { modalActions } from '../../../../common/UI/Modal/modalSlice';
// API
import { createBoard } from '../../boardAPI';

// component
import BoardImageUploadModal from './imageModal/BoardImageUploadModal';
// mUI
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import BorderColorIcon from '@mui/icons-material/BorderColor';
// css
import classes from './CreateBoardForm.module.scss';

const CreateBoardForm = () => {
  const [images, setImages] = useState([]);
  const contentRef = useRef();
  const isImageUploadVisible = useSelector((state) => state.modal.isVisible);
  const dispatch = useDispatch();
  const addPhotoHander = () => {
    dispatch(
      modalActions.onModal({
        backDropClickClose: false,
        backDropTransparent: true,
      })
    );
  };

  const modalImageLoadHandler = (files) => {
    console.log('제출 form에서 보여줘야함', files);
    setImages(() => images.concat(files));
  };
  const boardUploadHandler = (event) => {
    event.preventDefault();
    const uploadContent = contentRef.current.value;
    const uploadImages = images;
    createBoard(uploadContent, uploadImages);
    // url 자신의 것으로 이동해야함 history 어쩌고?
  };

  return (
    <>
      {isImageUploadVisible && (
        <BoardImageUploadModal loadImageFromModal={modalImageLoadHandler} />
      )}
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.title}>
            <BorderColorIcon />새 게시물
          </div>
          <div className={classes.userInfo}>
            <h3>이름</h3>
            <img
              src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
              alt="프로필 이미지 작게"
            />
            <img src="http://www.geonames.org/flags/x/kr.gif" alt="국기" />
          </div>
          <hr />
          <form onSubmit={boardUploadHandler}>
            <textarea
              name=""
              id=""
              cols="50"
              rows="20"
              defaultValue="임시 텍스트에리어"
              ref={contentRef}
            />

            <div className={classes.addPhotoButton} onClick={addPhotoHander}>
              <AddAPhotoIcon />
            </div>

            <div className={classes.imageAndButtonContainer}>
              <div className={classes.imageContainer}>
                {images.map((file) => (
                  <div key={file.preview}>
                    <img src={file.preview} alt="" />
                  </div>
                ))}
                {/* <img src="" alt="이미지견본1" />
                <img src="" alt="이미지견본2" /> */}
                <div className={classes.extraImage}>+ 몇 장</div>
              </div>
              <div className={classes.buttonContainer}>
                <button type="button">취소</button>
                <button type="submit">작성</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateBoardForm;
