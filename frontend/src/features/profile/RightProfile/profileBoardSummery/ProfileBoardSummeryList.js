import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// API
import { fetchUserBoardList } from '../../../board/boardAPI';
//custom-component
import ProfileBoardSummeryItem from './ProfileBoardSummeryItem';
// mui
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// css
import classes from './ProfileBoardSummeryList.module.scss';

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

  return (
    <>
      {isLoading ? (
        <div>...loading</div>
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
              {isLoading ? (
                <div>...loading</div>
              ) : (
                <div onClick={fetchBoardListPaging}>
                  <div>더보기</div>
                  <ExpandMoreIcon />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ProfileBoardSummeryList;
