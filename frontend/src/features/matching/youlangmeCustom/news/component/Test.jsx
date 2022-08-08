// react core

// API

// external module

// external component

// custom component

// css
import classes from './Test.module.scss';

const Test = (props) => {
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}></div>
          <div className={classes.main}>이건 테스트 파일입니다.</div>
          <div className={classes.footer}></div>
        </div>
      </div>
    </>
  );
};
export default Test;
