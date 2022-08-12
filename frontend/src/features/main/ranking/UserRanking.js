// react core
import { useState, useEffect } from 'react';
// API
import { fetchUserRanking } from '../mainAPI';
// custom component
import UserInfo from '../../profile/LeftProfile/UserInfo/UserInfo';
//etc
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech'; 
import { podium, bronze, silver, gold } from './assets';
import classes from './UserRanking.module.scss';
import { grey } from '@mui/material/colors';

const UserRanking = (props) => {
  const [loading, setLoading] = useState(true);
  const [userRanking, setUserRanking] = useState([]);
  useEffect(() => {
    setLoading(true);
    (async () => {
      const data = await fetchUserRanking();
      console.log(data);
      setUserRanking(() => data);
    })();
    setLoading(() => false);
  }, []);

  return (
    <>
      {loading ? (
        <div>is Loading...</div>
      ) : (
        <div className={classes.wrapper}>
          <div className={classes.container}>
            <div className={classes.header}>
              <MilitaryTechIcon fontSize="large" sx={{ color: grey[500]}} />
              {/* <img src={podium} alt="시상대" /> */}
              사용자 랭킹
            </div>
            <div className={classes.main}>
              <div className={classes.ranked_user}>
                <img src={gold} alt="1위" />
                {/* <UserInfo user={1} /> */}
              </div>
              <div className={classes.ranked_user}>
                <img src={silver} alt="2위" />
                {/* <UserInfo user={2} /> */}
              </div>
              <div className={classes.ranked_user}>
                <img src={bronze} alt="3위" />
                {/* <UserInfo user={3} /> */}
              </div>
              <div className={classes.omit}>...</div>
              <div className={classes.ranked_user}>
                <span>ME</span> 
                {/* <UserInfo user={4} /> */}
              </div>
            </div>
            <div className={classes.footer}></div>
          </div>
        </div>
      )}
    </>
  );
};
export default UserRanking;
