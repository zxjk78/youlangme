// react core

// API

// external module

// external component

// custom component

// css
import classes from './VideoRoomHeader.module.scss';
// etc
import logo from '../../../../assets/logo_1.png';

const VideoRoomHeader = (props) => {
  return (
    <>
      <div className={classes.main}>
        <div>
          <img src={logo} alt="로고" />
        </div>
        <div>누구누구와의 채팅</div>
        <div>시간 띄워줄 수 있으면 시간</div>
      </div>
    </>
  );
};
export default VideoRoomHeader;
