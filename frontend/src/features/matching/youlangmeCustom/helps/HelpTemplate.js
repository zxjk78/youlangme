// react core
import { useState, useEffect } from 'react';
// API
import { fetchNews } from '../../matchAPI';
// external module
import CircularProgress from '@mui/material/CircularProgress';

// external component
import CancelIcon from '@mui/icons-material/Cancel';

// custom component
import NewsCardList from './NewsCardList';
// css
import classes from './HelpTemplate.module.scss';

const HelpTemplate = (props) => {
  console.log(props.myNationality, props.yourNationality);

  const closeModal = () => {
    props.toggleModal();
  };

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}>
            <div>News</div>
            <div onClick={closeModal}>
              <CancelIcon />
            </div>
          </div>
          <div className={classes.main}>
            <NewsCardList
              myNationality={props.myNationality}
              yourNationality={props.yourNationality}
            />
          </div>
          <div className={classes.footer}></div>
        </div>
      </div>
    </>
  );
};
export default HelpTemplate;
