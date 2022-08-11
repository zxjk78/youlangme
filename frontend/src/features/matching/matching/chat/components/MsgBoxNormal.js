// left right 는 위에서 받는걸로....

import classes from './MsgBoxNormal.module.scss';

const MsgBoxNormal = (props) => {
  const message = props.message;

  return (
    <>
      <div className={classes.content}>
        <span className="triangle" />
        <p className="text">{message}</p>
      </div>
    </>
  );
};
export default MsgBoxNormal;
