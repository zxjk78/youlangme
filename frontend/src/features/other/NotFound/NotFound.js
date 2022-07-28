import classes from './NotFound.module.scss';
const NotFound = () => {
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.message}>
            <div>404 Not Found</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
