// react core
import { useState, useEffect } from 'react';

// API
import { fetchNews, fetchNews2 } from '../../matchAPI';

// external module

// external component
import CircularProgress from '@mui/material/CircularProgress';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// custom component
import NewsCard from './NewsCard3';
// css
import classes from './NewsCardList.module.scss';
// static data
import { newsText } from '../../../../common/utils/data/nationalityData';

const NewsCardList = (props) => {
  const [loading, setLoading] = useState(true);
  // const [remoteUserNationality, setRemoteUserNationality] = useState(null);
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(0);
  // const myNationality = props.myNationality;
  // const yourNationality = props.yourNationality;
  const myNationality = 'USA';
  const yourNationality = 'JAPAN';
  useEffect(() => {
    (async () => {
      // 내 국가 언어, 상대 국가 뉴스 받는 api
      const data = await fetchNews2(myNationality, yourNationality);
      setArticles(() => data.articles);

      setLoading(() => false);
    })();
  }, []);

  const showPrev = () => {
    setPage((prev) => prev - 1);
  };
  const showNext = () => {
    setPage((prev) => prev + 1);
  };
  const openOriginHandler = (url) => {
    window.open(url, '', 'left=50,top=50,width=800,height=600');
  };
  const shareNewsHandler = (newsInfo) => {
    props.shareNews(newsInfo);
  };
  return (
    <div className={classes.wrapper}>
      {loading ? (
        <div className={classes.loading}>
          <div>Now Loading....</div>
          <div>
            <CircularProgress />
          </div>
        </div>
      ) : (
        <div className={classes.wrapper}>
          <div className={classes.container}>
            <div className={classes.header}>
              <div>{newsText(myNationality, yourNationality)}</div>
              <div>
                {page !== 0 ? (
                  <div>
                    <ArrowBackIosIcon onClick={showPrev} />
                  </div>
                ) : (
                  <div>Start</div>
                )}
                {(page + 1) * 4 < articles.length ? (
                  <div>
                    <ArrowForwardIosIcon onClick={showNext} />
                  </div>
                ) : (
                  <div>End</div>
                )}
              </div>
            </div>
            {articles.slice(page * 4, page * 4 + 4).length === 0 ? (
              <div className={classes.main2}>
                적합한 검색 결과가 없습니다.- 나중에 꾸미기
              </div>
            ) : (
              <div className={classes.main}>
                {articles
                  .slice(page * 4, page * 4 + 4)
                  .map((article, index) => (
                    <NewsCard
                      key={article.url + index}
                      article={article}
                      openOrigin={openOriginHandler}
                      shareNews={shareNewsHandler}
                    />
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default NewsCardList;
