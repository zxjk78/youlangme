// redux
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { modalActions } from '../../../../common/UI/Modal/modalSlice';

import BoardDetailModal from '../../../board/detail/components/BoardDetailModal';
import classes from './Feed.module.scss';

const Feed = (props) => {
  const dispatch = useDispatch();
  const boardDetailVisible = useSelector((state) => state.modal.isVisible);
  const showBoardDetailHandler = (event) => {
    // 게시글의 pk를 모달에 전달하고, 모달을 켜야함
    console.log('게시글 요약 창 클릭', event.target);
    dispatch(modalActions.onModal({ backDropTransparent: true }));
  };

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.boardDetailModal}>
            {boardDetailVisible && <BoardDetailModal boardNo={props.xxx} />}
          </div>
          {props.feedList.map((item, index) => (
            <div
              key={item.id}
              onClick={showBoardDetailHandler}
            >{`${index}  리스트 아이템 나열`}</div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Feed;
