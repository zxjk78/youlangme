// custom component
import FeedLIst from './feed/FeedList';
import UserRanking from './ranking/UserRanking';
import RecommendUser from './recommendUser/RecommendUser';
import LanguageRanking from './ranking/LanguageRanking';
// external component

// css
import classes from './Main.module.scss';

const Maintmp = (props) => {
  return (
    <>
      <div className={classes.main_container}>
        <div className={classes['feed-container']}>
          <FeedLIst />
        </div>

        <div className={classes['userRanking-container']}>
          <UserRanking />
        </div>

        <div className={classes['languageRanking-container']}>
          <LanguageRanking />
        </div>
        <div className={classes['followRecommand-container']}>
          <RecommendUser />
        </div>
      </div>
      <div className={classes.footer}></div>
    </>
  );
};
export default Maintmp;
