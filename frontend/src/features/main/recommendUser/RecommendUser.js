import { useState, useEffect } from 'react';

//component
import RecommendUserInfo from './RecommendUserInfo';
import RecommendModal from './RecommendModal';
//API
import { fetchRecommendUser } from '../mainAPI';
// external component
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { Button } from '@mui/material';
import styled from '@emotion/styled';
//css
import classes from './RecommendUser.module.scss';

const CustomPersonAddAltIcon = styled(PersonAddAltIcon)`
  color: #fff;
  margin-right: 10px;
  width: 30px;
  height: 30px;
`;

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
            <RecommendModal
              recommendList={recommendUser}
              close={closeRecommendModal}
            />
          )}
          <div className={classes.wrapper}>
            <div className={classes.container}>
              <div className={classes.header}>
                <div className={classes.follow_recom}>
                  <CustomPersonAddAltIcon />

                  <div>팔로우 추천</div>
                </div>
                {recommendUser.length !== 0 && (
                  <Button
                    onClick={showRecommendModal}
                    className={classes.more_follow}
                    size="small"
                    color="inherit"
                    sx={{ width: '70px', height: '30px', color: '#fff' }}
                  >
                    + 더보기
                  </Button>
                )}
              </div>
              <div className={classes.main}>
                {recommendUser.length === 0 ? (
                  <div className={classes.noReco}>
                    <div>
                      <CelebrationIcon />
                      <span>회원님은 이미 모두의 친구입니다.</span>
                    </div>
                  </div>
                ) : (
                  <>
                    {recommendUser.slice(0, 3).map((item) => (
                      <RecommendUserInfo
                        userId={item.userId}
                        userName={item.userName}
                        key={item.userId}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default RecommendUser;
