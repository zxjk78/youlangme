import { API_URL } from '../api/http-config';
import boardDefaultImage from '../../assets/boardDefault.jpg';
const BoardImageSrc = (props) => {
  const imgErrorHandler = (e) => {
    e.target.src = { boardDefaultImage };
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
