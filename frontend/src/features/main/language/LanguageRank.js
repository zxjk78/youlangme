import classes from './LanguageRank.module.scss';

const LanguageRank = (props) => {
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}>많이 이용되는 언어</div>
          <div className={classes.main}>
            <div>1.영어</div>
            <div>2.중국어</div>
            <div>3.한국어</div>
          </div>
          <div className={classes.footer}></div>
        </div>
      </div>
    </>
  );
};
export default LanguageRank;
