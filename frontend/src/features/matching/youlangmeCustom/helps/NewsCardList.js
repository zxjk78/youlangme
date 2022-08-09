// react core
import { useState, useEffect } from 'react';

// API
import { fetchNationality, fetchNews } from '../../matchAPI';

// external module

// external component
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// custom component
import NewsCard from './NewsCard2';
// css
import classes from './NewsCardList.module.scss';

const NewsCardList = (props) => {
  const remoteUserId = props.remoteUserId;
  const [loading, setLoading] = useState(true);
  const [remoteUserNationality, setRemoteUserNationality] = useState(null);
  const [articles, setArticles] = useState([]);
  const [nowPage, setNowPage] = useState(1);
  const [page, setPage] = useState(1);
  const myLang = 'ENGLISH';
  useEffect(() => {
    (async () => {
      const nation = await fetchNationality(remoteUserId);
      setRemoteUserNationality(nation);
      // 내 국가 언어, 상대 국가 뉴스 받는 api
      const data = await fetchNews(myLang, nation, page);
      // console.log(data);
      setArticles(data.articles);
      setLoading(false);
    })();
  }, [page]);
  const fetchPrev = async () => {
    setPage((prev) => prev - 1);
  };
  const fetchNext = async () => {
    setPage((prev) => prev + 1);
  };
  return (
    <>
      {loading ? (
        <div>...is Loading</div>
      ) : (
        <div className={classes.wrapper}>
          <div className={classes.container}>
            <div className={classes.header}>
              <div>[{remoteUserNationality}]의 뉴스</div>
              <div>
                {page !== 1 ? (
                  <div>
                    <ArrowBackIosIcon onClick={fetchPrev} />
                  </div>
                ) : (
                  <div></div>
                )}
                <div>
                  <ArrowForwardIosIcon onClick={fetchNext} />
                </div>
              </div>
            </div>
            <div className={classes.main}>
              {articles.map((article) => (
                <>
                  <NewsCard key={article._id} article={article} />
                </>
              ))}
            </div>
            <div className={classes.footer}></div>
          </div>
        </div>
      )}
    </>
  );
};
export default NewsCardList;
