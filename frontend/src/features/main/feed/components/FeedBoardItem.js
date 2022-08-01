// mui
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

// css
import classes from './FeedBoardItem.module.scss';
const API_URL = 'http://127.0.0.1:8080/';
const FeedBoardItem = (props) => {
  const boardInfo = props.boardInfo;
  const createdTime = new Date(boardInfo.createdTime);
  const contents = boardInfo.contents;
  const username = boardInfo.name;
  const userPk = boardInfo.id;
  const boardPk = boardInfo.pk;
  const createdAt =
    new Date().getDate() - createdTime.getDate() === 0
      ? `${createdTime.getHours()}:${String(createdTime.getMinutes()).padStart(
          2,
          '0'
        )}`
      : `${createdTime.getMonth() + 1}/${createdTime.getDate()}`;

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}>
            <div className={classes.author}>
              <img
                src={`${API_URL}image/profile/${userPk}.jpg`}
                alt="프로필 이미지명"
              />
              <div>{username}</div>
            </div>
            <div className={classes.createdAt}>{createdAt}</div>
          </div>
          <div className={classes.content}>{contents}</div>
          <div className={classes.footerWrapper}>
            <div className={classes.footer}>
              <ChatBubbleOutlineIcon />
              <FavoriteBorderIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedBoardItem;
