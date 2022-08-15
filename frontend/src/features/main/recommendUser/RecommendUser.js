import { useState, useEffect } from 'react';

//component
import RecommendUserInfo from './RecommendUserInfo';
import RecommendModal from './RecommendModal';
//API
import { fetchRecommendUser } from '../mainAPI';
//css
import classes from './RecommendUser.module.scss';

import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { grey } from '@mui/material/colors';
import { Button } from '@mui/material';

const RecommendUser = (props) => {
  const [isLoading, setisLoading] = useState(true);
  const [recommendUser, setRecommendUser] = useState([]);
  const [recoModalVisible, setRecoModalVisible] = useState(false);
  useEffect(() => {
    (async () => {
      const data = await fetchRecommendUser();
      setRecommendUser(data);
      // setRecommendUser(data.slice(0,3));
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
            <RecommendModal
              recommendList={recommendUser}
              close={closeRecommendModal}
            />
          )}
          <div className={classes.wrapper}>
            <div className={classes.container}>
              <div className={classes.header}>
                <div className={classes.follow_recom}>
                  <PersonAddAltIcon sx={{  fontSize: 40,  mr: 2, color: grey[500]}} />
  
                  <div>
                    팔로우 추천
                  </div> 

                </div>
                <Button onClick={showRecommendModal}
                  className={classes.more_follow}
                  size="small"
                  color="inherit"
                  sx={{ width: '20px', height:'30px'}}>
                  더보기
                </Button>
              </div>
              <div className={classes.main}>
                {recommendUser.slice(0,3).map((reco) => (
                // {recommendUser.map((reco) => (
                  <RecommendUserInfo
                    userId={reco.followerId}
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
