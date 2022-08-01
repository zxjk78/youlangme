import UserInfo from '../../profile/UserInfo/UserInfo';

// css
import classes from './ProfileBoardItem.module.scss';
// func
import { createdDateCal } from '../func/commonFunctions';

const ProfileBoardItem = (props) => {
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}>
            <UserInfo user={props.user} />
            {createdDateCal(props.createdAt)}
          </div>
          <div className={classes.main}>
            <div className={classes.contentContainer}>{props.content}</div>
            <div className={classes.picsContainer}>
              {props.pics.map((pic) => (
                <img src={`${123}sdsd`} key={pic.name} alt={pic.name} />
              ))}
            </div>
          </div>
          <div className={classes.footer}></div>
        </div>
      </div>
    </>
  );
};
export default ProfileBoardItem;
