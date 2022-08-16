// react core
import { useState } from 'react';

// API

// external module

// external component

// custom component

// css
import classes from './LowerToolBarMenuItem.module.scss';

const LowerToolBarMenuItem = (props) => {
  const activate = props.activate;
  const deactivate = props.deactivate;
  const nowState = props.activateStatus;
  const [isActive, setIsActive] = useState(nowState);
  // active 상태면 끄고, deactive 상태면 켬
  const clickHandler = () => {
    if (isActive) {
      setIsActive(() => false);
      props.deactivateFn();
    } else {
      setIsActive(() => true);
      props.activateFn();
    }
  };

  return (
    <>
      <div className={classes.container} onClick={clickHandler}>
        <div className={classes.main}>
          <div className={classes.iconArea}>
            {isActive ? deactivate.icon : activate.icon}
          </div>
          <div className={classes.textArea}>
            {isActive ? deactivate.text : activate.text}
          </div>
        </div>
      </div>
    </>
  );
};
export default LowerToolBarMenuItem;
