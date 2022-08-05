import { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { createBoardActions } from '../createBoardSlice';
// API
import { createBoard, fetchBoardInfo, updateBoard } from '../../boardAPI';
import { API_URL } from '../../../../common/api/http-config';

// component
import BoardImageUploadModal from './imageModal/BoardImageUploadModal';
import UserInfo from '../../../profile/LeftProfile/UserInfo/UserInfo';
// mUI
import { common } from '@mui/material/colors';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// css
import classes from './CreateBoardForm.module.scss';
// static data
import { MAX_IMAGE_LIMIT } from '../data';

// 어떤 방식으로던 이동해옴, 라우터로부터 수정인지 생성인지 알아냄

const CreateBoardForm = () => {
  const boardId = useParams().boardId;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [boardInfo, setBoardInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const contentRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const imageLimit = MAX_IMAGE_LIMIT;
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // src => file object with preview prop function
  const convertURLtoFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    const ext = url.split('.').pop();
    const filename = url.split('/').pop();
    const metadata = { type: `image/${ext}` };
    const file = new File([data], filename, metadata);

    Object.assign(file, { preview: URL.createObjectURL(file) });
    return file;
  };
  useEffect(() => {
    if (boardId) {
      (async () => {
        setIsLoading(true);
        const tmpInfo = await fetchBoardInfo(boardId);
        setBoardInfo(() => tmpInfo);
        const imageSrcs = tmpInfo.imgList;
        dispatch(createBoardActions.setFileCnt(imageSrcs.length));
        const convertedList = await Promise.all(
          imageSrcs.map((item) => {
            const url = `${API_URL}image/board/${item}`;
            return convertURLtoFile(url);
          })
        );
        setImages((prevState) => prevState.concat(convertedList));
        setIsLoading(false);
      })();
    }
  }, [boardId]);

  const addPhotoHander = () => {
    setIsModalVisible(() => true);
  };

  const modalImageLoadHandler = (files) => {
    // console.log('제출 form에서 보여줘야함', files);
    setImages((prevState) => prevState.concat(files));
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
  const boardUploadHandler = async (event) => {
    event.preventDefault();
    const uploadContent = contentRef.current.value;
    const uploadImages = images;

    let data;
    if (!boardId) {
      data = await createBoard(uploadContent, uploadImages);
    } else {
      data = await updateBoard(boardId, uploadContent, uploadImages);
    }

    if (data.success) {
      dispatch(createBoardActions.clearFile());
      history.push('/main');
    } else {
      alert('오류가 발생했습니다.');
    }
  };
  const cancelHandler = (event) => {
    history.goBack();
  };
  const closeModalHandler = () => {
    setIsModalVisible(() => false);
  };

  return (
    <>
      {isModalVisible && (
        <BoardImageUploadModal
          loadImageFromModal={modalImageLoadHandler}
          closeModal={closeModalHandler}
        />
      )}
      {!isLoading ? (
        <div className={classes.wrapper}>
          <div className={classes.container}>
            <div className={classes.title}>
              <BorderColorIcon />
              {!boardInfo ? '새 게시물' : '게시물 수정'}
            </div>
            <div className={classes.formContainer}>
              <div className={classes.userInfoContainer}>
                <UserInfo user={currentUser} />
              </div>
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
                  defaultValue={boardInfo ? boardInfo.contents : ''}
                />

                <div className={classes.imageAndButtonContainer}>
                  <div className={classes.imageContainer}>
                    {images.length !== 0 &&
                      images.map((file, index) => {
                        // console.log(file); //promise file이 반환되는 문제 해결 필요
                        return (
                          <div key={file.preview} className={classes.fileImage}>
                            <HighlightOffIcon
                              sx={{ color: common[500] }}
                              className={classes.removeImgButton}
                              data-index={index}
                              onClick={imageRemoveHandler}
                            />
                            <img src={file.preview} alt="" />
                          </div>
                        );
                      })}
                    {images.length < MAX_IMAGE_LIMIT && (
                      <div
                        className={classes.addPhotoButton}
                        onClick={addPhotoHander}
                      >
                        <AddAPhotoIcon color="action" />
                        <div
                          className={classes.extraImage}
                        >{`${images.length} / ${imageLimit}`}</div>
                      </div>
                    )}
                  </div>
                  <div className={classes.buttonContainer}>
                    <button type="button" onClick={cancelHandler}>
                      취소
                    </button>
                    <button type="submit">
                      {!boardInfo ? '작성' : '글 수정'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div>is Loading...</div>
      )}
    </>
  );
};

export default CreateBoardForm;

// {/* {!boardInfo ? */}
//       // : boardInfo.imgList.map((image) => (
//       //     <img
//       //       key={image}
//       //       src={`${API_URL}image/board/${image}`}
//       //       alt="게시판 수정 시 이미지"
//       //     />
//         ))}
