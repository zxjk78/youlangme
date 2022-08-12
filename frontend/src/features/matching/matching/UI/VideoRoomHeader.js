// react core

// API

// external module

// external component

// custom component

// css
import classes from './VideoRoomHeader.module.scss';

const VideoRoomHeader = (props) => {
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.main}>
            <div>youlangme 로고</div>
            <div>누구누구와의 채팅</div>
            <div>시간 띄워줄 수 있으면 시간</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default VideoRoomHeader;
