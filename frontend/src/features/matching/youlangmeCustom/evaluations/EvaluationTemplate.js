
import CancelIcon from '@mui/icons-material/Cancel';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import axios from 'axios';
import { useState } from 'react';
import { accessToken, API_URL } from '../../../../common/api/http-config';

// css
import classes from './EvaluationTemplate.module.scss';

const EvaluationTemplate = (props) => {
    const closeModal = () => {
        props.toggleModal();
    };

  const [isEvaluation, setIsEvaluation] = useState(null)

  const closeSessionTrue = (event) => {
    closeModal()
  }

  const closeSessionFalse = (event) => {
    closeModal()
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
