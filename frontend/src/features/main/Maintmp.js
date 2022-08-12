// custom component
import FeedBoardList from './feed/FeedBoardList';
import UserRanking from './ranking/UserRanking';
import RecommendUser from './recommendUser/RecommendUser';
import LanguageRanking from './ranking/LanguageRanking';
// external component

// css
import classes from './Main.module.scss';

const Maintmp = (props) => {
  return (
    <>
      <div className={classes.main}>
        {/* <div> */}
        <div className={classes.column1}>
          <FeedBoardList />
        </div>

        <div className={classes.column2}>
        {/* <div> */}
          <UserRanking />
          <LanguageRanking />
          <RecommendUser />
        </div>
      </div>
      <div className={classes.footer}></div>
    </>
  );
};
export default Maintmp;
