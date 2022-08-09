// react core
import { useState, useEffect } from 'react';
// API
import { fetchUserRanking } from '../mainAPI';
// custom component
import UserInfo from '../../profile/LeftProfile/UserInfo/UserInfo';
//etc
import { podium, bronze, silver, gold } from './assets';
import classes from './UserRanking.module.scss';

const UserRanking = (props) => {
  const [loading, setLoading] = useState(true);
  const [langRanking, setLangRanking] = useState([]);
  useEffect(() => {
    setLoading(true);
    (async () => {
      const data = await fetchUserRanking();
      console.log(data);
      setLangRanking(() => data);
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
              <img src={podium} alt="시상대" />
              유저 랭킹
            </div>
            <div className={classes.main}>
              <div>
                <img src={gold} alt="1위" />
                <UserInfo user={1} />
              </div>
              <div>
                <img src={silver} alt="2위" />
                <UserInfo user={2} />
              </div>
              <div>
                <img src={bronze} alt="3위" />
                <UserInfo user={3} />
              </div>
              <div className={classes.omit}>...</div>
              <div>
                내 순위
                <UserInfo user={4} />
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
