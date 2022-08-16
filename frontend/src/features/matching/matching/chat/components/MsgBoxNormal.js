import React from 'react';

import classes from './MsgBoxNormal.module.scss';

const MsgBoxNormal = React.forwardRef((props, ref) => {
  const message = props.message;
  return (
    <>
      <div className={classes.content}>
        <span className="triangle" />
        <p className="text" ref={ref}>
          {message}
        </p>
      </div>
    </>
  );
});
export default MsgBoxNormal;
