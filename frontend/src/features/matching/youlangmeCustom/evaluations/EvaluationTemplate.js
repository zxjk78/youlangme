import axios from 'axios';

// mui
import CancelIcon from '@mui/icons-material/Cancel';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
// css
import classes from './EvaluationTemplate.module.scss';
// etc
import { API_URL } from '../../../../common/api/http-config';

const CustomButton1 = styled(Button)`
  background-color: #d3d3d3;
  color: #000;
`;

const CustomButton2 = styled(Button)`
  background-color: blueviolet;
  color: #fff;
`;
const CustomContactIcon = styled(ContactSupportIcon)`
  width: 150px;
  height: 150px;
  color: #fff;
`;

const EvaluationTemplate = (props) => {
  const closeModal = () => {
    props.toggleModal();
  };

  const closeSessionTrue = (event) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const accessToken = user ? user.accessToken : null;
    const header = {
      'Content-Type': 'application/json',
      'X-Auth-Token': accessToken,
    };
    axios
      .post(
        API_URL + 'meeting/feedback',
        { feedback: 1 },
        {
          headers: header,
        }
      )
      .then((response) => {
        console.log(response.data);
        closeModal();
      })
      .catch((err) => {
        alert(err.message);
        closeModal();
      });
  };

  const closeSessionFalse = (event) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const accessToken = user ? user.accessToken : null;
    const header = {
      'Content-Type': 'application/json',
      'X-Auth-Token': accessToken,
    };
    axios
      .post(
        API_URL + 'meeting/feedback',
        { feedback: 0 },
        {
          headers: header,
        }
      )
      .then((response) => {
        console.log(response.data);
        closeModal();
      })
      .catch((err) => {
        alert(err.message);
        closeModal();
      });
  };

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
            <div className={classes.question}>
              <div>
                <CustomContactIcon />
              </div>
              <div>아까 전 채팅에 만족하셨나요?</div>
              <div>이후의 채팅 매칭에 반영됩니다.</div>
            </div>
            <Stack direction="row" spacing={2} className={classes.answer}>
              <CustomButton2 onClick={closeSessionTrue} variant="contained">
                네
              </CustomButton2>
              <CustomButton1 onClick={closeSessionFalse}>아니오</CustomButton1>
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
};
export default EvaluationTemplate;
