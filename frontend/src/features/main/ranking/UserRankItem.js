// react core

// API

// external module

// external component

// custom component
import UserInfo from '../../profile/LeftProfile/UserInfo/UserInfo';
// css
import classes from './UserRankItem.module.scss';

const UserRankItem = (props) => {
  const info = props.rankInfo;
  const userId = JSON.parse(localStorage.getItem('currentUser')).id;
  return (
    <>
      <div
        className={`${classes.wrapper} ${info.id === userId && classes.myRank}`}
      >
        <div className={`${classes.container}`}>
          <div className={classes.rank}>{info.rank}</div>
          <div className={classes.detail}>
            <div>
              <UserInfo user={{ id: info.id, name: info.name }} small />
            </div>
            {info.id === userId && <div className={classes.me}>Me</div>}
            <div>{info.lv}점</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserRankItem;
