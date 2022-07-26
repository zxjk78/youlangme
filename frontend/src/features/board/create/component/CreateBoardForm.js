import { useRef, useState } from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../../../../common/UI/Modal/modalSlice';
import { createBoardActions } from '../createBoardSlice';
// API
import { createBoard } from '../../boardAPI';

// component
import BoardImageUploadModal from './imageModal/BoardImageUploadModal';
// mUI
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// css
import classes from './CreateBoardForm.module.scss';
// static data
import { MAX_IMAGE_LIMIT } from '../data';

const CreateBoardForm = () => {
  const [images, setImages] = useState([]);
  const contentRef = useRef();
  const isImageUploadVisible = useSelector((state) => state.modal.isVisible);
  const dispatch = useDispatch();

  const imageLimit = MAX_IMAGE_LIMIT;

  const addPhotoHander = () => {
    dispatch(
      modalActions.onModal({
        backDropClickClose: false,
        backDropTransparent: true,
      })
    );
  };

  const modalImageLoadHandler = (files) => {
    // console.log('제출 form에서 보여줘야함', files);
    setImages(() => images.concat(files));
  };
  const imageRemoveHandler = (event) => {
    const fileIdx = Number(event.target.dataset.index);
    dispatch(createBoardActions.removeFileCnt());
    setImages((state) =>
      state.filter((file, index) => {
        return index !== fileIdx;
      })
    );
  };
  const boardUploadHandler = (event) => {
    event.preventDefault();
    const uploadContent = contentRef.current.value;
    const uploadImages = images;
    createBoard(uploadContent, uploadImages);
    // url 자신의 프로필 페이지로 이동해야함 history 어쩌고?
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
          <div className={classes.formContainer}>
            <div className={classes.userInfo}>
              <div>
                <img
                  src="http://www.geonames.org/flags/x/kr.gif"
                  className={classes.flag}
                  alt="국기"
                />
                <img
                  src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
                  className={classes.profile}
                  alt="프로필 이미지 작게"
                />
              </div>
              <h3>이름</h3>
            </div>
            <hr />
            <form onSubmit={boardUploadHandler}>
              <textarea
                name=""
                id=""
                cols="80"
                rows="10"
                placeholder="게시글을 작성해주세요"
                required
                maxLength={400}
                ref={contentRef}
              />

              {/* <div className={classes.addPhotoButton} onClick={addPhotoHander}>
                <AddAPhotoIcon />
              </div> */}

              <div className={classes.imageAndButtonContainer}>
                <div className={classes.imageContainer}>
                  {images.map((file, index) => (
                    <div key={file.preview} className={classes.fileImage}>
                      <HighlightOffIcon
                        className={classes.removeImgButton}
                        data-index={index}
                        onClick={imageRemoveHandler}
                      />
                      <img src={file.preview} alt="" />
                    </div>
                  ))}
                  <div
                    className={classes.addPhotoButton}
                    onClick={addPhotoHander}
                  >
                    <AddAPhotoIcon />
                    <div
                      className={classes.extraImage}
                    >{`${images.length} / ${imageLimit}`}</div>
                  </div>
                </div>
                <div className={classes.buttonContainer}>
                  <button type="button">취소</button>
                  <button type="submit">작성</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBoardForm;
