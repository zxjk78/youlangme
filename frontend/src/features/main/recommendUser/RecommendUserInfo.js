import classes from './RecommendUserInfo.module.scss';
import UserInfo from '../../profile/LeftProfile/UserInfo/UserInfo';
const RecommendUserInfo = (props) => {
  return (
    <>
      <div className={classes.recommendUser} key={props.followerId}>
        <UserInfo
          user={{
            id: props.followerId,
            name: props.name,
            nationality: props.nationality,
          }}
        />
        <button>팔로우</button>
      </div>
    </>
  );
};
export default RecommendUserInfo;
