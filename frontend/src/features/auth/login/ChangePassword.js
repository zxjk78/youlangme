import axios from 'axios';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../../common/UI/Modal/modalSlice';
import classes from './ChangePassword.module.scss';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const API_URL = 'http://127.0.0.1:8080/';
  const [validation, setValidation] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  // cors 에러 남. 백엔드 수정 필요
  const sendPasswordRequest = async (email) => {
    try {
      const email = emailRef.current.value;
      const response = await axios.post(API_URL + `findPwd/${email}`);
      alert('임시 비밀번호가 발급되었습니다.');
      dispatch(modalActions.offModal());
    } catch (err) {
      alert(err.message);
    }
  };
  const emailInputValidate = () => {
    const email = emailRef.current.value;
    const regex = new RegExp(
      '^[0-9a-zA-Z](?:[._-]?[a-zA-Z0-9])*[@][0-9a-zA-Z]+(?:[._-]?[a-zA-Z0-9])*[.][a-zA-Z]{2,3}$'
    );
    const isValidate = regex.test(email);

    if (isValidate) {
      setValidation(true);
    } else {
      setValidation(false);
    }
  };
  const lostFocus = () => {
    setIsBlur(true);
  };
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.title}>
            <div>비밀번호 찾기</div>
          </div>

          <div className={classes.content}>
            <p>가입시 사용했던 이메일을 입력하세요.</p>
            <input
              type="text"
              ref={emailRef}
              onChange={emailInputValidate}
              onBlur={lostFocus}
            />
            {!validation && isBlur && (
              <div className={classes.validation}>
                유효한 이메일을 입력해 주세요.
              </div>
            )}
          </div>
          <button disabled={!validation} onClick={sendPasswordRequest}>
            임시 비밀번호 발급
          </button>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
