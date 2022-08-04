import { useState, useEffect } from 'react';
//API
import { fetchFolloweeBoard } from '../../board/boardAPI';
import FeedBoardItem from './FeedBoardItem';
import classes from './FeedBoardList.module.scss';

const Feed = (props) => {
  const [followeeBoardList, setFolloweeBoardList] = useState([]);
  const [lastBoardId, setLastBoardId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(() => true);
    (async () => {
      const data = await fetchFolloweeBoard(lastBoardId);
      console.log(data);
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
            {/* 게시글 정보 받을 때, 유저 pk값 받기 필요 */}
            {followeeBoardList.map((item) => (
              <FeedBoardItem key={item.boardId} boardInfo={item} />
            ))}
          </div>
          <button type="button" onClick={fetchBoardPageHandler}>
            더보기
          </button>
        </div>
      )}
    </>
  );
};

export default Feed;
