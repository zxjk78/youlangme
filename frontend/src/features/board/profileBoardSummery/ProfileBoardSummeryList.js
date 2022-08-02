import classes from './ProfileBoardSummeryList.module.scss';
import ProfileBoardSummeryItem from './ProfileBoardSummeryItem';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { modalActions } from '../../../common/UI/Modal/modalSlice';
import BoardDetailModal from '../detail/components/BoardDetailModal';
import { fetchUserBoardList } from '../boardAPI';
const ProfileBoardSummeryList = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userBoardList, setUserBoardList] = useState([]);
  const authorId = useParams().userId;
  const isBoardDetailVisible = useSelector((state) => state.modal.isVisible);
  const dispatch = useDispatch();
  let modalLocation;
  useEffect(() => {
    (async () => {
      const data = await fetchUserBoardList(authorId);
      setUserBoardList((prevState) => [...prevState, ...data]);
    })();
    setIsLoading(false);
  }, [authorId]);

  const showDetailModal = (boardId) => {
    modalLocation = <BoardDetailModal boardId={boardId} />;
    dispatch(modalActions.onModal());
  };

  return (
    <>
      {isBoardDetailVisible && <div>{modalLocation}</div>}

      {isLoading ? (
        '123'
      ) : (
        <div className={classes.wrapper}>
          <div className={classes.container}>
            <div className={classes.header}></div>
            <div className={classes.main}>
              {userBoardList.map((board) => (
                <ProfileBoardSummeryItem
                  key={board.boardId}
                  boardInfo={board}
                  showDetail={showDetailModal}
                />
              ))}
            </div>
            <div className={classes.footer}></div>
          </div>
        </div>
      )}
    </>
  );
};
export default ProfileBoardSummeryList;
