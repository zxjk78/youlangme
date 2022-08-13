import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
// API
import { fetchUserBoardList } from '../../../board/boardAPI';
//custom-component
import ProfileBoardSummeryItem from './ProfileBoardSummeryItem';
import CreateNewBoardLink from '../../../board/create/component/CreateNewBoardLink';
// mui
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
// css
import classes from './ProfileBoardSummeryList.module.scss';

const ProfileBoardSummeryList = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userBoardList, setUserBoardList] = useState([]);
  const [isBoardOver, setIsBoardOver] = useState(false);
  const params = useParams();
  const authorId = params?.userId || props.userId;
  const { currentUser } = useSelector((state) => state.auth);
  const isCurrentUser = currentUser.id === Number(authorId);

  useEffect(() => {
    (async () => {
      const data = await fetchUserBoardList(authorId);
      if (data.length < 5) {
        setIsBoardOver(() => true);
      }
      setUserBoardList((prevState) => [...data]);
    })();
    setIsLoading(false);
  }, [authorId]);

  const fetchBoardListPaging = async () => {
    const lastBoardId = userBoardList.at(-1).boardId;
    const data = await fetchUserBoardList(authorId, lastBoardId);
    if (data.length < 5) {
      setIsBoardOver(() => true);
    }
    setUserBoardList((prevState) => [...prevState, ...data]);
  };
  return (
    <>
      {isLoading ? (
        <div>...loading</div>
      ) : (
        <>
          <div className={classes.wrapper}>
            <div className={classes.container}>
              {isCurrentUser && 
                <div className={classes.header}>
                  <CreateNewBoardLink />
                </div>
              }
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
                  !isBoardOver && (
                    <div onClick={fetchBoardListPaging}>
                      <div>더보기</div>
                      <ExpandMoreIcon />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default ProfileBoardSummeryList;
