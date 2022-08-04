import classes from './ProfileBoardSummeryList.module.scss';
import ProfileBoardSummeryItem from './ProfileBoardSummeryItem';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchUserBoardList } from '../../../board/boardAPI';

const ProfileBoardSummeryList = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userBoardList, setUserBoardList] = useState([]);
  // const [lastBoardId, setLastBoardId] = useState(0);
  const params = useParams();
  const authorId = params?.userId || props.userId;

  useEffect(() => {
    (async () => {
      const data = await fetchUserBoardList(authorId);
      setUserBoardList((prevState) => [...data]);
    })();
    setIsLoading(false);
  }, [authorId]);

  const fetchBoardListPaging = async () => {
    const lastBoardId = userBoardList.at(-1).boardId;
    const data = await fetchUserBoardList(authorId, lastBoardId);
    setUserBoardList((prevState) => [...prevState, ...data]);
  };
  const closeModal = () => {
    console.log('모달 닫기 시도');
  };

  return (
    <>
      {isLoading ? (
        '...loading'
      ) : (
        <div className={classes.wrapper}>
          <div className={classes.container}>
            <div className={classes.header}></div>
            <div className={classes.main}>
              {userBoardList.map((board) => (
                <ProfileBoardSummeryItem
                  key={board.boardId}
                  boardInfo={board}
                />
              ))}
            </div>
            <div className={classes.footer}>
              <button onClick={fetchBoardListPaging}>더보기</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ProfileBoardSummeryList;
