import classes from './Ranking.module.scss';
import { useState } from 'react';
import UserInfo from '../../profile/LeftProfile/UserInfo/UserInfo';
import { podium, bronze, silver, gold } from './assets';
import { useEffect } from 'react';
//header의 시상대 그냥 만들어서 사용할 것
const Ranking = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      // const data = await func();
    })();
  });

  // 랭킹 정보 받는 API

  return (
    <>
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
            <div>...</div>
            <div>
              나
              <UserInfo user={4} />
            </div>
          </div>
          <div className={classes.footer}></div>
        </div>
      </div>
    </>
  );
};
export default Ranking;
