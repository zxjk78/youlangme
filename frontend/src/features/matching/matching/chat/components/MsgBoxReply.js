import React from 'react';

import classes from './MsgBoxReply.module.scss';

const MsgBoxReply = React.forwardRef((props, ref) => {
  const message = props.message;
  const originalMessage = props.originalMessage;
  return (
    <>
      <div className={classes.content}>
        <div className={classes.originMsgInfo}>
          <div>답장</div>
          <div>
            {originalMessage.length > 100
              ? originalMessage.slice(0, 100) + '...'
              : originalMessage}
          </div>
        </div>
        <span className="triangle" />
        <p className={classes.text} ref={ref}>
          {message}
        </p>
      </div>
    </>
  );
});
export default MsgBoxReply;
