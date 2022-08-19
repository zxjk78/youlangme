// react core
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// API
import { fetchUserRanking } from '../mainAPI';
// external component
// custom component
import UserRankItem from './UserRankItem';
//etc
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import classes from './UserRanking.module.scss';
import styled from '@emotion/styled';
import { notInitialized } from 'react-redux/es/utils/useSyncExternalStore';

const CustomMilitaryTechIcon = styled(MilitaryTechIcon)`
  color: #fff;
`;

const UserRanking = (props) => {
  const [loading, setLoading] = useState(true);
  const [userRanking, setUserRanking] = useState([]);
  const userId = JSON.parse(localStorage.getItem('currentUser')).id;
  useEffect(() => {
    setLoading(true);
    (async () => {
      const data = await fetchUserRanking(userId);
      setUserRanking(() => data);
    })();
    setLoading(() => false);
  }, [userId]);

  return (
    <>
      {loading ? (
        <div>is Loading...</div>
      ) : (
        <div className={classes.wrapper}>
          <div className={classes.container}>
            <div className={classes.header}>
              <CustomMilitaryTechIcon fontSize="medium" />
              <div>리더보드</div>
            </div>
            <div className={classes.main}>
              {userRanking.map((item) => (
                <Link
                  to={`/profile/${item.id}`}
                  style={{ textDecoration: 'none', color: '#000' }}
                >
                  <UserRankItem key={item.id} rankInfo={item} />
                </Link>
              ))}
            </div>
            <div className={classes.footer}></div>
          </div>
        </div>
      )}
    </>
  );
};
export default UserRanking;
