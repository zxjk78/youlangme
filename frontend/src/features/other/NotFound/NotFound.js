import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
// component
import Header from '../../../common/UI/Header/Header';

// css
import classes from './NotFound.module.scss';

// 히스토리에서 {path:경로 , ...rest} 객체를 담아 보낼 수 있고, 이를 useLocation으로 받아서 사용가능
const NotFound = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const location = useLocation();

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.notFound}>
            <div>404</div>
            <div>
              Not
              <br />
              Found
            </div>
          </div>
          <div className={classes.message}>{location.message}</div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
