import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const container = {
  display: 'flex',
  flexDirection: 'row',
};

const LikeContainer = (props) => {
  const dislikeHandler = () => {
    props.dislike();
  };
  const likeHandler = () => {
    props.like();
  };

  return (
    <>
      <div style={container}>
        <div>
          {props.isLiked ? (
            <FavoriteIcon onClick={dislikeHandler} />
          ) : (
            <FavoriteBorderIcon onClick={likeHandler} />
          )}
        </div>
        <div>{props.cnt}</div>
      </div>
    </>
  );
};
export default LikeContainer;
