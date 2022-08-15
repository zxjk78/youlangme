import { useState, useEffect } from 'react';
//API
import { fetchFolloweeBoard } from '../../board/boardAPI';
import { fetchAllFeed } from './FeedAPI';

// custom component
import FeedBoardItem from './FeedBoardItem';
import CreateNewBoardLink from '../../board/create/component/CreateNewBoardLink';

// external component
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import classes from './FeedBoardList.module.scss';

const FeedBoardList = (props) => {
  const [followeeFeedList, setFolloweeFeedList] = useState([]);
  const [lastFeedId, setLastFeedId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isFeedOver, setIsFeedOver] = useState(false);

// 5가 4 팔로우한거.
  useEffect(() => {
    setIsLoading(() => true);
    (async () => {
      const data = await fetchAllFeed();
      // const data = await fetchFolloweeFeed(lastFeedId);
      console.log(data)
      // if (data.length < 5) {
      //   setIsFeedOver(() => true);
      // }
      // setFolloweeFeedList((prevState) => [...prevState, ...data]);
    })();
    setIsLoading(() => false);
  }, [ lastFeedId]);

  const fetchFeedPageHandler = async () => {
    setLastFeedId(() => followeeFeedList.at(-1).feedId);
  };

  return (
    <>
      {isLoading ? (
        <div>now Loading...</div>
      ) : (
        <div className={classes.wrapper}>
          <div className={classes.container}>
            <div className={classes.header}>
              <div>피드</div>
              <CreateNewBoardLink />
            </div>
            {/* 게시글 정보 받을 때, 유저 pk값 받기 필요 */}
            {followeeFeedList.map((item) => (
              <FeedBoardItem key={item.feedId} boardInfo={item} />
            ))}
          </div>
          <div className={classes.footer}>
            {!isFeedOver && (
              <div className={classes.more} onClick={fetchFeedPageHandler}>
                <div>더보기</div>
                <ExpandMoreIcon />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FeedBoardList;
