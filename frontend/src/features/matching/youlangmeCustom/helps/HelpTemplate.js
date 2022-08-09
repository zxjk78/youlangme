// react core
import { useState, useEffect } from 'react';
// API
import { fetchNews } from '../../matchAPI';
// external module

// external component
import CancelIcon from '@mui/icons-material/Cancel';
// custom component
import NewsCardList from './NewsCardList';
import NewsCard from './NewsCard2';
// css
import classes from './HelpTemplate.module.scss';

const HelpTemplate = (props) => {
  const remoteUserId = props.remoteUserId;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  const closeModal = () => {
    props.toggleModal();
  };

  return (
    <>
      {loading ? (
        <div>is Loading</div>
      ) : (
        <div className={classes.wrapper}>
          <div className={classes.container}>
            <div className={classes.header}>
              <div>
                <p>화제 찾기</p>
                {/* <p>주제 추천</p> */}
                <div onClick={closeModal}>
                  <CancelIcon />
                </div>
              </div>
            </div>
            <div className={classes.main}>
              <NewsCardList remoteUserId={remoteUserId} />
            </div>
            <div className={classes.footer}></div>
          </div>
        </div>
      )}
    </>
  );
};
export default HelpTemplate;
