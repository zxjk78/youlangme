// react core
import { Link } from 'react-router-dom';
// external component
import ControlPointIcon from '@mui/icons-material/ControlPoint';

// custom component
import classes from './CreateNewBoardLink.module.scss';
const CreateNewBoardLink = (props) => {
  return (
    <>
      <div className={classes.link}>
        <Link to={`/board/create`}>
          새 게시글 작성 <ControlPointIcon />
        </Link>
      </div>
    </>
  );
};
export default CreateNewBoardLink;
