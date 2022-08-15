// react core
import { useSelector } from 'react-redux';

// API

// external module

// external component

// custom component

// css
import classes from './MsgBoxNews.module.scss';

const MsgBoxNews = (props) => {
  const newsURL = useSelector((state) => state.news.newsURL);

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}></div>
          <div className={classes.main}>{newsURL}</div>
          <div className={classes.footer}></div>
        </div>
      </div>
    </>
  );
};
export default MsgBoxNews;
