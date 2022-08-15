import React from 'react';

// css
import classes from './MsgBoxNews.module.scss';

const MsgBoxNews = React.forwardRef((props, ref) => {
  const [newsUrl, newsImage, title] = props.newsInfo;
  const openOriginHandler = () => {
    window.open(newsUrl, '', 'left=50,top=50,width=800,height=600');
  };
  return (
    <>
      <div className={classes.wrapper} onClick={openOriginHandler}>
        <div className={classes.container}>
          <div className={classes.header}>
            <img src={newsImage} alt="뉴스이미지" />
          </div>
          <div className={classes.main}>
            <p className="text" ref={ref}>
              {title}
            </p>
          </div>
          <div className={classes.footer}></div>
        </div>
      </div>
    </>
  );
});
export default MsgBoxNews;
