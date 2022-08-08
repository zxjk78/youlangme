import { useState, useEffect } from 'react';
//API
import { fetchFolloweeBoard } from '../../board/boardAPI';
// custom component
import FeedBoardItem from './FeedBoardItem';
import CreateNewBoardLink from '../../board/create/component/CreateNewBoardLink';

// external component
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import classes from './FeedBoardList.module.scss';

const Feed = (props) => {
  const [followeeBoardList, setFolloweeBoardList] = useState([]);
  const [lastBoardId, setLastBoardId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isBoardOver, serIsBoardOver] = useState(false);
  useEffect(() => {
    setIsLoading(() => true);
    (async () => {
      const data = await fetchFolloweeBoard(lastBoardId);
      if (data.length < 5) {
        serIsBoardOver(() => true);
      }
      setFolloweeBoardList((prevState) => [...prevState, ...data]);
    })();
    setIsLoading(() => false);
  }, [lastBoardId]);
  const fetchBoardPageHandler = async () => {
    setLastBoardId(() => followeeBoardList.at(-1).boardId);
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
            {followeeBoardList.map((item) => (
              <FeedBoardItem key={item.boardId} boardInfo={item} />
            ))}
          </div>
          <div className={classes.footer}>
            {!isBoardOver && (
              <div className={classes.more} onClick={fetchBoardPageHandler}>
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

export default Feed;
