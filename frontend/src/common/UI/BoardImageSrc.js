import { API_URL } from '../api/http-config';

const BoardImageSrc = (props) => {
  const imgErrorHandler = (e) => {
    e.target.src =
      'https://protkd.com/wp-content/uploads/2017/04/default-image.jpg';
  };

  return (
    <img
      src={`${API_URL}image/board/${props.imgName}`}
      alt={props.alt}
      onError={imgErrorHandler}
    />
  );
};

export default BoardImageSrc;
