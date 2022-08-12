import React from 'react';

import classes from './MsgBoxNormal.module.scss';

const MsgBoxReply = React.forwardRef((props, ref) => {
  const message = props.message;
  const originalMessage = props.originalMessage;
  return (
    <>
      <div className={classes.content}>
        <div>교정</div>
        <div>{originalMessage}</div>
        <span className="triangle" />
        <p className="text" ref={ref}>
          {message}
        </p>
      </div>
    </>
  );
});
export default MsgBoxReply;
