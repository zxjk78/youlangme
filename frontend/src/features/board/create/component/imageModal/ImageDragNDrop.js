import React, { useState, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

// component
import ImageThumbContainer from './ImageThumbContainer';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
// static data
import { MAX_IMAGE_LIMIT } from '../../data';
//css
import classes from './ImageDragNDrop.module.scss';
// etc
import imageUpload from '../../../../../assets/imageUploadIcon.png';
const baseStyle = {
  height: '168px',
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

const ImageDragNDrop = (props) => {
  const maxLimit = MAX_IMAGE_LIMIT;
  const [files, setFiles] = useState([]);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loadedImgCnt, setLoadedImgCnt] = useState(props.imageCount);

  const { getRootProps, getInputProps, isFocused } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      if (loadedImgCnt + acceptedFiles.length > maxLimit) {
        alert('이미지 최대 갯수를 초과하였습니다.');

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
      setLoadedImgCnt((prevState) => (prevState += acceptedFiles.length));
    },
    maxFiles: maxLimit,
    multiple: true,
    noKeyboard: true,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? classes.focusedStyle : {}),
    }),
    [isFocused]
  );

  const onButtonClickHander = () => {
    props.loadImageFromModal(files);
  };

  const isImageUploaded = () => {
    setIsImageLoaded(true);
  };

  return (
    <section className={classes.wrapper}>
      <div className={classes.boxWrapperStyle}>
        <div className={classes.uploadBoxStyle}>
          <div {...getRootProps({ className: 'dropzone', style })}>
            <input {...getInputProps()} />
            {!isImageLoaded && (
              <div className={classes.msgStyle}>
                <img src={imageUpload} alt="" />
                {/* <CloudUploadOutlinedIcon fontSize="large" /> */}
                <p>
                  클릭하여 이미지를 고르거나 이곳에 드래그 해주세요. <br />
                  이미지는 최대 {maxLimit}장까지 업로드 가능합니다.
                </p>
              </div>
            )}
            <ImageThumbContainer
              uploadReadyFiles={files}
              isImageUploaded={isImageUploaded}
            />
          </div>
        </div>
      </div>
      <div className={`${classes.uploadButton}`}>
        <button
          type="button"
          className={isImageLoaded && classes.isImageLoaded}
          onClick={onButtonClickHander}
          disabled={!isImageLoaded}
        >
          업로드
        </button>
      </div>
    </section>
  );
};

export default ImageDragNDrop;
