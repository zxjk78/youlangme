import { Link } from 'react-router-dom';
import classes from './UserActivityMsg.module.scss';

// type에 따라서 다른 글을 렌더링하는 유저 활동 나열 컴포넌트
const UserActivityMsg = (props) => {
  const type = props.type;
  let component;
  if (type === 2) {
    component = (
      <div>
        <Link to={`profile/${props.fromUser}`}>props.formUser</Link> 님이{' '}
        <Link to={`profile/${props.toUser}`}>props.toUser</Link> 님을 팔로우하기
        시작했습니다.
      </div>
    );
  } else if (type === 3) {
    component = (
      <div>
        <Link to={`profile/${props.fromUser}`}>props.formUser</Link> 님이{' '}
        <Link to={`profile/${props.toUser}`}>props.toUser</Link> 님과 대화를
        시작했습니다.
      </div>
    );
  }

  return (
    <div className={classes.wrapper}>
      {component} <div className={classes.createdAt}></div>
    </div>
  );
};

export default UserActivityMsg;
