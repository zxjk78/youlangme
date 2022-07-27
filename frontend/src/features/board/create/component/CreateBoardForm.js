import { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../../../../common/UI/Modal/modalSlice';
import { createBoardActions } from '../createBoardSlice';
// API
import { createBoard, fetchBoard } from '../../boardAPI';

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

// 어떤 방식으로던 이동해옴, 라우터로부터 수정인지 생성인지 알아냄
const API_URL = 'http://127.0.0.1:8080/';

const CreateBoardForm = () => {
  const boardId = useParams().boardId;

  const [boardInfo, setBoardInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const contentRef = useRef();
  const isImageUploadVisible = useSelector((state) => state.modal.isVisible);
  const dispatch = useDispatch();
  const history = useHistory();
  const imageLimit = MAX_IMAGE_LIMIT;

  // const convertSrcFile = async (url) => {
  //   const fileName = Math.random() + url.slice(1, 10);
  //   const imgResponse = await fetch(url);
  //   const contentType = imgResponse.headers.get('content-type');
  //   const blob = await imgResponse.blob();
  //   const tmpFile = new File([blob], fileName, { contentType });
  //   Object.assign(tmpFile, {
  //     preview: URL.createObjectURL(tmpFile),
  //   });
  //   return tmpFile;
  // };

  useEffect(() => {
    console.log('didmount');
    if (boardId) {
      (async () => {
        setIsLoading(true);
        const tmpInfo = await fetchBoard(boardId);
        console.log(tmpInfo);
        setBoardInfo(() => tmpInfo.boardDetail);
        const imageUrls = tmpInfo.boardDetail.imgList;

        // const convertImages = imageUrls.map(async (imageSrc) => {
        //   const url = `${API_URL}image/board/${imageSrc}`;
        //   const fileName = String(url);

        //   fetch(url).then(async (response) => {
        //     const contentType = response.headers.get('content-type');
        //     const blob = await response.blob();
        //     const file = new File([blob], fileName, { contentType });

        //     console.log(file);
        //     console.log(URL.createObjectURL(file));
        //   });
        // });
        // setImages((prevState) => prevState.concat(convertImages)); // 이부분 object file로 만들어야함

        setIsLoading(false);
      })();
    }
  }, [boardId]);

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
    const data = await createBoard(uploadContent, uploadImages);

    if (data.success) {
      history.push('/main');
    } else {
      alert('오류가 발생했습니다.');
    }
  };
  const cancelHandler = (event) => {
    history.goBack();
  };

  return (
    <>
      {isImageUploadVisible && (
        <BoardImageUploadModal loadImageFromModal={modalImageLoadHandler} />
      )}
      {!isLoading ? (
        <div className={classes.wrapper}>
          <div className={classes.container}>
            <div className={classes.title}>
              <BorderColorIcon />
              {!boardInfo ? '새 게시물' : '게시물 수정'}
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
                  defaultValue={boardInfo ? boardInfo.contents : ''}
                />

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
