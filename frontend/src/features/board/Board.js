import CreateBoardForm from './create/component/CreateBoardForm';
import { useSelector } from 'react-redux';
const Board = () => {
  const { currentUser } = useSelector((state) => state.auth);
  console.log(currentUser);
  return (
    <>
      <CreateBoardForm></CreateBoardForm>
    </>
  );
};

export default Board;
