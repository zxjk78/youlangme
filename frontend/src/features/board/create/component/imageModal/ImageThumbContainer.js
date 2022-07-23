const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 90,
  height: 90,
  padding: 4,
  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

const ImageThumbContainer = (props) => {
  const uploadReadyImages = props.uploadReadyFiles;

  const thumbs = uploadReadyImages.map((file) => (
    <div style={thumb} key={file.preview}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
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
      <aside style={thumbsContainer}>{thumbs}</aside>
    </>
  );
};

export default ImageThumbContainer;
