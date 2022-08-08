// react core

// API

// external module

// external component

// custom component

// css
import classes from './HelpTemplate.module.scss';

const HelpTemplate = (props) => {
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}></div>
          <div className={classes.main}></div>
          <div className={classes.footer}></div>
        </div>
      </div>
    </>
  );
};
export default HelpTemplate;
