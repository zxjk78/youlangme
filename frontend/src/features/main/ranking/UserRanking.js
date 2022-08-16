// react core
import { useState, useEffect } from 'react';
// API
import { fetchUserRanking } from '../mainAPI';
// external component
// custom component
import UserRankItem from './UserRankItem';
//etc
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import { podium, bronze, silver, gold } from './assets';
import classes from './UserRanking.module.scss';
import styled from '@emotion/styled';

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
                <UserRankItem key={item.id} rankInfo={item} />
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
