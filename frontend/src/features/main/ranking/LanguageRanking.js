// react core
import { useState, useEffect } from 'react';
// API
import { fetchLanguageRanking } from '../mainAPI';
// external component
import TranslateIcon from '@mui/icons-material/Translate';
// css
import classes from './LanguageRanking.module.scss';

const LanguageRanking = (props) => {
  const [loading, setLoading] = useState(true);
  const [langRanking, setLangRanking] = useState([]);
  useEffect(() => {
    setLoading(true);
    (async () => {
      const data = await fetchLanguageRanking();
      setLangRanking(() => data);
    })();
    setLoading(() => false);
  }, []);

  return (
    <>
      {loading ? (
        <div>is loading...</div>
      ) : (
        <div className={classes.wrapper}>
          <div className={classes.container}>
            <div className={classes.header}>
              <div>
                <TranslateIcon fontSize="large" />
              </div>
              <div>많이 이용되는 언어</div>
            </div>
            <div className={classes.main}>
              {langRanking.map((lang, index) => (
                <div key={lang.language}>
                  {index + 1}. {lang.language.toUpperCase()} {lang.percent}%
                </div>
              ))}
            </div>
            <div className={classes.footer}></div>
          </div>
        </div>
      )}
    </>
  );
};
export default LanguageRanking;
