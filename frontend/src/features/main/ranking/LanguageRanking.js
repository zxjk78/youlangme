// react core
import { useState, useEffect } from 'react';
// API
import { fetchLanguageRanking } from '../mainAPI';

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
    setLoading(true);
    (async () => {
      const data = await fetchLanguageRanking();
      setLangRanking(()=> data);
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
                <LanguageIcon fontSize="large" sx={{ color: grey[500]}} />
              </div>
              <div className={classes.lng_ment}>많이 이용되는 언어</div>
            </div>
            {langRanking && 
              <div className={classes.main}>
                {langRanking.map((lang, index) => (
                  <div key={lang.language} className={classes.each_lng}>
                    <div className={classes.each_lng_rank}>
                      {index + 1}
                    </div>
                    <div className={classes.each_lng_name}>
                      {lang.language.toUpperCase()} 
                    </div>
                    <div className={classes.each_lng_ratio}>
                      {lang.percent}%
                    </div>
                  </div>
                ))}
              </div>
            
            }
            <div className={classes.footer}></div>
          </div>
        </div>
      )}
    </>
  );
};
export default LanguageRanking;
