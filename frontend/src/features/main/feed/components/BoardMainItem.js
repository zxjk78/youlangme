// mui
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

// css
import classes from './BoardMainItem.module.scss';

const BoardMainItem = (props) => {
  const createdTime = new Date(props.createdTime);
  const content = props.content;
  const username = props.username;
  const profileImageUrl = props.userImgUrl;
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
                src="https://www.akamai.com/site/im-demo/perceptual-standard.jpg?imbypass=true"
                alt="프로필 이미지명"
              />
              <div>유저명</div>
            </div>
            <div className={classes.createdAt}>생성시간</div>
          </div>
          <div className={classes.content}>
            글내용 몇자 이하글내용 몇자 이하만 보이게글내용 몇자 이하만
            보이게글내용 몇자 이하만 보이게글내용 몇자 이하만 보이게글내용 몇자
            이하만 보이게글내용 몇자 이하만 보이게글내용 몇글내용 몇자 이하만
            글내용 몇자 이하만 보이게글내용 몇자 이하만 보이게글내용 몇자 이하만
            글내용 몇자 이하만 보이게글내용 몇자 이하만 보이게 보이게 보이게자
            이하만 보이게글내용 몇자 이하만 보이게만 보이게
          </div>
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

export default BoardMainItem;
