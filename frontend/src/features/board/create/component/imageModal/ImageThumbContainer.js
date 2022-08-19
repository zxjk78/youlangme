import classes from './ImageThumbContainer.module.scss';

const ImageThumbContainer = (props) => {
  const uploadReadyImages = props.uploadReadyFiles;

  const thumbs = uploadReadyImages.map((file) => (
    // <div className={thumb} key={file.preview}>
    <div className={classes.thumb} key={file.preview}>
      <div className={classes.thumbInner}>
        <img
          src={file.preview}
          className={classes.img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            props.isImageUploaded();
            // 메모리 누수를 위해 화면상에만 남겨두고 메모리에선 blob을 제거하는 과정인데
            // 폼 제출시 까지 보여주어야 하므로 여기서 진행 안함
            // URL.revokeObjectURL(file.preview);
          }}
          alt=""
        />
      </div>
    </div>
  ));

  return (
    <>
      <aside className={classes.thumbsContainer}>{thumbs}</aside>
    </>
  );
};

export default ImageThumbContainer;
