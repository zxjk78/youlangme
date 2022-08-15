
import CancelIcon from '@mui/icons-material/Cancel';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import axios from 'axios';
import { useState } from 'react';
import { API_URL } from '../../../../common/api/http-config';

// css
import classes from './EvaluationTemplate.module.scss';


const EvaluationTemplate = (props) => {
    const closeModal = () => {
        props.toggleModal();
    };

  

  const closeSessionTrue = (event) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const accessToken = user ? user.accessToken : null;
    const header = {
      "Content-Type": "application/json",
      "X-Auth-Token": accessToken,
    };
    axios.post(API_URL+"meeting/feedback", {feedback : 1}, {
      headers: header,
    }).then((response)=>{
      console.log(response.data)
      closeModal()
    }).catch((err)=>{
      alert(err.message)
      closeModal()
     })
  }

  const closeSessionFalse = (event) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const accessToken = user ? user.accessToken : null;
    const header = {
      "Content-Type": "application/json",
      "X-Auth-Token": accessToken,
    };
    axios.post(API_URL+"meeting/feedback", {feedback : 0}, {
      headers: header,
    }).then((response)=>{
      console.log(response.data)
      closeModal()
    }).catch((err)=>{
      alert(err.message)
      closeModal()
     })
  }



  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}>
            <div>Evaluation</div>
            <div onClick={closeModal}>
              <CancelIcon />
            </div>
          </div>
          <div className={classes.main}>
             <div>채팅에 만족하셨습니까?</div>
                <SentimentSatisfiedAltIcon fontSize="large" onClick={(e)=>closeSessionTrue(e)} />
                <SentimentVeryDissatisfiedIcon  fontSize="large" onClick={(e)=>closeSessionFalse(e)} />
          </div>
        </div>
      </div>
    </>
  );
};
export default EvaluationTemplate;
