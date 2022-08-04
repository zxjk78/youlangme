import { useState, useEffect } from 'react';

//component
import RecommendUserInfo from './RecommendUserInfo';
import RecommentModal from './RecommentModal';
//API
import { fetchRecommendUser } from '../mainAPI';
//css
import classes from './RecommendUser.module.scss';

const RecommendUser = (props) => {
  const [isLoading, setisLoading] = useState(true);
  const [recommendUser, setRecommendUser] = useState([]);
  const [recoModalVisible, setRecoModalVisible] = useState(false);
  useEffect(() => {
    (async () => {
      const data = await fetchRecommendUser();
      setRecommendUser(data);
    })();

    setisLoading(false);
  }, []);
  const showRecommendModal = () => {
    setRecoModalVisible(() => true);
  };
  const closeRecommendModal = () => {
    setRecoModalVisible(() => false);
  };
  return (
    <>
      {isLoading ? (
        <div>is Loading</div>
      ) : (
        <>
          {recoModalVisible && (
            <RecommentModal
              recommendList={recommendUser}
              close={closeRecommendModal}
            />
          )}
          <div className={classes.wrapper}>
            <div className={classes.container}>
              <div className={classes.header}>
                <div>팔로우 추천</div>
                <div onClick={showRecommendModal}>더보기</div>
              </div>
              <div className={classes.main}>
                {recommendUser.map((reco) => (
                  <RecommendUserInfo
                    id={reco.followerId}
                    name={reco.name}
                    nationality={reco.nationality}
                    key={reco.followerId}
                  />
                ))}
              </div>
              <div className={classes.footer}></div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default RecommendUser;
