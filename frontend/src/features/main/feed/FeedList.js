import { useState, useEffect } from 'react';
//API
import { fetchFeed, fetchFeedMore } from './FeedAPI';
import { fetchAllFeed } from './FeedAPI';

// custom component
import FeedBoardItem from './FeedBoardItem';
import FeedFollowItem from './FeedFollowItem';
import CreateNewBoardLink from '../../board/create/component/CreateNewBoardLink';

// external component
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';

import classes from './FeedList.module.scss';

const FeedLIst = (props) => {
  const [followeeFeedList, setFolloweeFeedList] = useState([]);
  const [nextFeedId, setNextFeedId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isFeedOver, setIsFeedOver] = useState(false);

  useEffect(() => {
    setIsLoading(() => true);
    (async () => {
      const data = await fetchFeed();
      console.log(data.feedResponseDtoList);
      console.log(data.nextId);
      setFolloweeFeedList((prevState) => [
        ...prevState,
        ...data.feedResponseDtoList,
      ]);
      setNextFeedId(data.nextId);
    })();
    setIsLoading(() => false);
  }, []);

  const fetchFeedMoreHandler = async () => {
    const data = await fetchFeedMore(nextFeedId);

    setFolloweeFeedList((prevState) => [
      ...prevState,
      ...data.feedResponseDtoList,
    ]);
    setNextFeedId(data.nextId);
  };

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}>
            <div>피드</div>
            <CreateNewBoardLink />
          </div>
          <div className={classes.main}>
            {isLoading ? (
              <div>
                <CircularProgress size={60} />
              </div>
            ) : (
              <>
                <div className={classes.feedArea1}>
                  {followeeFeedList.map((item, index) => {
                    if (index % 2 === 0) {
                      let tmp;
                      if (item.logType === 'WRITE_POST') {
                        tmp = (
                          <FeedBoardItem
                            key={item.detail + 'W'}
                            boardInfo={item}
                          />
                        );
                      } else if (item.logType === 'FOLLOWED') {
                        tmp = (
                          <FeedFollowItem
                            key={item.detail + 'F'}
                            followInfo={item}
                          />
                        );
                      }
                      return tmp;
                    }
                  })}
                </div>
                <div className={classes.feedArea2}>
                  {followeeFeedList.map((item, index) => {
                    if (index % 2 === 1) {
                      let tmp;
                      if (item.logType === 'WRITE_POST') {
                        tmp = (
                          <FeedBoardItem
                            key={item.detail + 'W'}
                            boardInfo={item}
                          />
                        );
                      } else if (item.logType === 'FOLLOWED') {
                        tmp = (
                          <FeedFollowItem
                            key={item.detail + 'F'}
                            followInfo={item}
                          />
                        );
                      }
                      return tmp;
                    }
                  })}
                </div>

                {/* {followeeFeedList.map((item) => {
                  let tmp;
                  if (item.logType === 'WRITE_POST') {
                    tmp = (
                      <FeedBoardItem key={item.detail + 'W'} boardInfo={item} />
                    );
                  } else if (item.logType === 'FOLLOWED') {
                    tmp = (
                      <FeedFollowItem
                        key={item.detail + 'F'}
                        followInfo={item}
                      />
                    );
                  }
                  return tmp;
                })} */}
              </>
            )}
          </div>
          <div className={classes.footer}>
            {nextFeedId !== -1 && (
              <div className={classes.more} onClick={fetchFeedMoreHandler}>
                <div>더보기</div>
                <ExpandMoreIcon />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedLIst;
