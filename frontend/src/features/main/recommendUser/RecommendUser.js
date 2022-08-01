import UserInfo from '../../profile/UserInfo/UserInfo';
import classes from './RecommendUser.module.scss';

const RecommendUser = (props) => {
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}>팔로우 추천</div>
          <div className={classes.main}>
            친구 한 3, 4명 + 팔로우 버튼
            <UserInfo user={1} />
          </div>
          <div className={classes.footer}></div>
        </div>
      </div>
    </>
  );
};
export default RecommendUser;
