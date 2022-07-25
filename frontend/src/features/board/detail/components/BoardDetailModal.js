import Modal from '../../../../common/UI/Modal/Modal';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import classes from './BoardDetailModal.module.scss';
const BoardDetail = (props) => {
  return (
    <>
      <Modal>
        <div className={classes.wrapper}>
          <div className={classes.header}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
              alt=""
            />
            <div className={classes.username}>유저임</div>
            <div className={classes.createdAt}>몇일전</div>
          </div>
          <div className={classes.main}>
            <div className={classes.photoContainer}></div>
            <div className={classes.contentContainer}>
              글 내용입니다. 글내용입니다.
            </div>
            <div className={classes.likeCommentCnt}>
              <FavoriteBorderIcon />
              <ChatBubbleOutlineIcon />
            </div>
          </div>
          <div className={classes.comment}>
            <div className={classes.header}>
              <ChatBubbleOutlineIcon />
              <div>댓글</div>
            </div>
            <div className={classes.commentInput}>
              <form onSubmit={1}>
                <input type="text" placeholder="댓글을 작성해주세요" />
                <button>게시</button>
              </form>
            </div>
            <div className={classes.commentContainer}></div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BoardDetail;
