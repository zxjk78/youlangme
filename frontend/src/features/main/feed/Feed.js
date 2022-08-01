// redux
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { modalActions } from '../../../common/UI/Modal/modalSlice';
//API
import { fetchBoard } from '../mainAPI';
import FeedBoardItem from './components/FeedBoardItem';
import BoardDetailModal from '../../board/detail/components/BoardDetailModal';
import classes from './Feed.module.scss';

const Feed = (props) => {
  const [boardList, setBoardList] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const dispatch = useDispatch();
  const boardDetailVisible = useSelector((state) => state.modal.isVisible);
  const showBoardDetailModalHandler = (event) => {
    // 게시글의 pk를 모달에 전달하고, 모달을 켜야함
    console.log('게시글 요약 창 클릭', event.target);
    dispatch(modalActions.onModal({ backDropTransparent: true }));
  };

  const fetchBoardPageHandler = async (event) => {
    console.log('게시글 더보기 버튼 클릭', event.target);
    // 페이지 번호 담아서 api에 요청하고, 받아와서 list 뒤에 추가
    const data = await fetchBoard(pageNum + 1);

    if (data) {
      setPageNum((prevState) => prevState + 1);

      setBoardList([...boardList, ...data]); // 이 과정에서 5~10뿐만 아니라 0~5까지 전체 렌더링이 되고 있는지 파악 필요
    }
  };
  useEffect(() => {
    (async () => {
      const data = await fetchBoard();
      console.log(data);
      setBoardList(data);
    })();
  }, []);

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.boardDetailModal}>
            {boardDetailVisible && <BoardDetailModal boardNo={props.xxx} />}
          </div>
          {/* 게시글 정보 받을 때, 유저 pk값 받기 필요 */}
          {boardList.map((item) => (
            <FeedBoardItem
              key={item.boardId}
              boardInfo={item}
              onClick={showBoardDetailModalHandler}
            />
          ))}
        </div>
        <button type="button" onClick={fetchBoardPageHandler}>
          더보기
        </button>
      </div>
    </>
  );
};

export default Feed;
