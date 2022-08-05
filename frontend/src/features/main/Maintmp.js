import { Link } from 'react-router-dom';

// custom component
import FeedBoardList from './feed/FeedBoardList';
import UserRanking from './ranking/UserRanking';
import RecommendUser from './recommendUser/RecommendUser';
import LanguageRank from './ranking/LanguageRanking';
// external component
import ControlPointIcon from '@mui/icons-material/ControlPoint';

// css
import classes from './Maintmp.module.scss';
const Maintmp = (props) => {
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}></div>
          <div className={classes.main}>
            <div className={classes.column1}>
              <Link to={`board/create`}>
                <ControlPointIcon />
              </Link>
              <FeedBoardList />
            </div>

            <div className={classes.column2}>
              <UserRanking />
              <LanguageRank />
              <RecommendUser />
            </div>
          </div>
          <div className={classes.footer}></div>
        </div>
      </div>
    </>
  );
};
export default Maintmp;
