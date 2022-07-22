// redux
import { useSelector, useDispatch } from 'react-redux';
import { modalActions } from '../../../../common/UI/Modal/modalSlice';
// component
import BoardImageUploadModal from './BoardImageUploadModal';
// mUI
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import BorderColorIcon from '@mui/icons-material/BorderColor';
// css
import classes from './CreateBoardForm.module.scss';

const CreateBoardForm = () => {
  const isImageUploadVisible = useSelector((state) => state.modal.isVisible);
  const dispatch = useDispatch();
  const addPhotoHander = () => {
    dispatch(modalActions.onModal(false));
  };

  return (
    <>
      {isImageUploadVisible && <BoardImageUploadModal />}
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
          <form>
            <textarea
              name=""
              id=""
              cols="50"
              rows="20"
              defaultValue="임시 텍스트에리어"
            />

            <div className={classes.addPhotoButton} onClick={addPhotoHander}>
              <AddAPhotoIcon />
            </div>

            <div className={classes.imageAndButtonContainer}>
              <div className={classes.imageContainer}>
                <img src="" alt="이미지견본1" />
                <img src="" alt="이미지견본2" />
                <div>이미지 현재 장 수 보여주는 이미지랑 크기 똑같은</div>
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
