import classes from './Maintmp.module.scss';
import Feed from './feed/Feed';
import Ranking from './ranking/Ranking';
import RecommendUser from './recommendUser/RecommendUser';
import LanguageRank from './language/LanguageRank';
const Maintmp = (props) => {
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}></div>
          <div className={classes.main}>
            <Feed />
            <div className={classes.column2}>
              <Ranking />
              <RecommendUser />
              <LanguageRank />
            </div>
          </div>
          <div className={classes.footer}></div>
        </div>
      </div>
    </>
  );
};
export default Maintmp;
