import UserInfo from '../../../profile/LeftProfile/UserInfo/UserInfo';

import { createdDateCal } from '../../../../utils/functions/commonFunctions';

// mui
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

// css
import classes from './FeedBoardItem.module.scss';
const API_URL = 'http://127.0.0.1:8080/';
const FeedBoardItem = (props) => {
  const boardInfo = props.boardInfo;
  const contents = boardInfo?.contents;
  const username = boardInfo?.userName;
  const userId = boardInfo?.userId;
  const boardId = boardInfo?.boardId;
  const createdAt = createdDateCal(boardInfo.createdTime, false);
  const commentCnt = boardInfo?.commentCnt;
  const likeCnt = boardInfo?.likeCnt;

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}>
            <div className={classes.author}>
              <UserInfo user={{ id: userId, name: username }} />
            </div>
            <div className={classes.createdAt}>{createdAt}</div>
          </div>
          <div className={classes.content}>{contents}</div>
          <div className={classes.footerWrapper}>
            <div className={classes.footer}>
              <div>
                <ChatBubbleOutlineIcon />
                {commentCnt}
              </div>
              <div>
                <FavoriteBorderIcon />
                {likeCnt}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedBoardItem;
