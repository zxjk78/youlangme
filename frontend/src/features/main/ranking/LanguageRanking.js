// react core
import { useState, useEffect } from 'react';
// API
import { fetchLanguageRanking } from '../mainAPI';
// custom component
import LanguagePieChart from './LanguagePieChart';
// external component
// import TranslateIcon from '@mui/icons-material/Translate';
import LanguageIcon from '@mui/icons-material/Language';
// css
import classes from './LanguageRanking.module.scss';
import { grey } from '@mui/material/colors';

const LanguageRanking = (props) => {
  const [loading, setLoading] = useState(true);
  const [langRanking, setLangRanking] = useState([]);

  useEffect(() => {
    setLoading(() => true);
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
          <div className={classes.header}>
            <div>
              <LanguageIcon />
            </div>
            <div>많이 사용한 언어</div>
          </div>
          <LanguagePieChart languageRanking={langRanking} />
        </div>
      )}
    </>
  );
};
export default LanguageRanking;
