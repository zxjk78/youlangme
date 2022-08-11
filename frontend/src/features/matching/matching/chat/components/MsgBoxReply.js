// left right 는 위에서 받는걸로....

import classes from './MsgBoxNormal.module.scss';

const MsgBoxReply = (props) => {
  const message = props.message;
  const originalMessage = props.originalMessage;
  return (
    <>
      <div className={classes.content}>
        <div>교정</div>
        <div>{originalMessage}</div>
        <span className="triangle" />
        <p className="text">{message}</p>
      </div>
    </>
  );
};
export default MsgBoxReply;
