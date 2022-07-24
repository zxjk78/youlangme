import React, { useState, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { createBoardActions } from '../../createBoardSlice';

// component
import ImageThumbContainer from './ImageThumbContainer';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
// static data
import { MAX_IMAGE_LIMIT } from '../../data';

const msgStyle = {
  height: '100%',
  fontSize: '1rem',
};
const msgStyle2 = {
  height: '50%',
  fontSize: '0.5rem',
};

const boxWrapperStyle = {
  width: '90%',
  height: '70%',
  backgroundColor: '#f9f3ee',
  margin: '0px auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
const uploadBoxStyle = {
  width: '90%',
  height: '90%',
  border: 'dashed 2px #4b4b4b',
};

const baseStyle = {
  height: '200px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const focusedStyle = {
  borderColor: '#2196f3',
};

const ImageDragNDrop = (props) => {
  const maxLimit = MAX_IMAGE_LIMIT;
  const [files, setFiles] = useState([]);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const loadedImgCnt = useSelector(
    (state) => state.createBoard.loadedImgFileCnt
  );
  const dispatch = useDispatch();

  const { getRootProps, getInputProps, isFocused } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      if (loadedImgCnt + acceptedFiles.length > maxLimit) {
        // alert('몇개이상 안됨')
        console.log('이미지 최대 갯수 초과');
        return;
      }

      setFiles(() => {
        const newAddedFiles = acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
        return [...files].concat(newAddedFiles);
      });
      dispatch(createBoardActions.addFileCnt(acceptedFiles.length));
    },
    maxFiles: maxLimit,
    multiple: true,
    noKeyboard: true,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
    }),
    [isFocused]
  );

  // useEffect(() => {
  //   console.log(files);
  //   // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
  //   return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  // }, [files]);

  const onButtonClickHander = () => {
    props.loadImageFromModal(files);
  };

  const isImageUploaded = () => {
    setIsImageLoaded(true);
  };

  return (
    <section className="container">
      <div style={boxWrapperStyle}>
        <div style={uploadBoxStyle}>
          <div {...getRootProps({ className: 'dropzone', style })}>
            <input {...getInputProps()} />
            <div style={isImageLoaded ? msgStyle2 : msgStyle}>
              <CloudUploadOutlinedIcon />
              <p>
                이미지를 선택하거나 이곳에 올려 주세요. <br />
                이미지는 최대 {maxLimit}장까지 업로드 가능합니다.
              </p>
            </div>
            <ImageThumbContainer
              uploadReadyFiles={files}
              isImageUploaded={isImageUploaded}
            />
          </div>
        </div>
      </div>

      <button type="button" onClick={onButtonClickHander}>
        업로드
      </button>
    </section>
  );
};

export default ImageDragNDrop;
