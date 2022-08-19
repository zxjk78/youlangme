import React, { useState } from 'react';

//react-router
import { Link, useHistory } from 'react-router-dom';

// redux
import { createDispatchHook, useDispatch, useSelector } from 'react-redux';
import { getUser, login } from '../authSlice';

// external module
import Trianglify from 'react-trianglify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// custom component
import ChangePassword from './ChangePassword';
import Modal from '../../../common/UI/Modal/Modal';
// external component
import Button from '@mui/material/Button';
import styled from '@emotion/styled';

// css
import classes from './Login2.module.scss';
// etc
import { API_URL } from '../../../common/api/http-config';
import logInGoogle from '../../../assets/logInGoogle.png';

const CustomButton = styled(Button)`
  width: 90%;
  height: 40px;
  min-width: 250px;
  background-color: #b865c6;
  color: #fff;
  transition: 0.5s;
  &:disabled {
    /* cursor: pointer; */
    background-color: #d3d3d3;
  }
  &:hover {
    background-color: #7447bb;
  }
`;
const SocialLoginButton = styled(Button)`
  width: 100%;
  height: 40px;
  min-width: 250px;
  background-color: transparent;
  &:hover {
    background-color: transparent;
  }
`;

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('유효하지 않은 이메일 형식입니다.')
    .required('이메일을 입력해 주세요.'),
  password: yup.string().required('비밀번호를 입력해 주세요.'),
});

const MySwal = withReactContent(Swal);

const Login2 = (props) => {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const history = useHistory();

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(validationSchema), mode: 'onChange' });

  const handleLogin = (formValue) => {
    setLoading(true);
    const { email, password } = formValue;
    dispatch(login({ email, password }))
      .unwrap()
      .then((res) => {
        console.log(res.response);
        history.push('/main');
      })
      .catch((err) => {
        // 에러메세지를 보고 어떤유형의 에러인지 판단해야함 - 안타깝게도 이렇게 뜸: Request failed with status code 500
        // sweetalert2 로변경부분
        MySwal.fire({
          icon: 'error',
          title: '로그인 실패',
          text: '아이디 또는 비밀번호를 다시 확인해 주세요.',
        });
      });
  };

  const googleLogin = () => {
    window.location.href = API_URL + 'oauth2/authorization/google';
  };
  const showModal = () => {
    setIsModalVisible(() => true);
  };
  const closeModal = () => {
    setIsModalVisible(() => false);
  };

  return (
    <>
      {isModalVisible && (
        <Modal closeModalHandler={closeModal} findPassword>
          <ChangePassword />
        </Modal>
      )}

      <div className={classes.backdrop}>
        <Trianglify
          width={window.innerWidth}
          height={window.innerHeight}
          xColors={[
            '#FFEE95',
            '#FDDF46',
            '#FF4676',
            '#04286E',
            '#080945',
            '#CB4C39',
            '#F2B170',
            '#F4F8B5',
            '#B8D689',
            '#5A9E5D',
          ]}
          variance={0.9}
          cellSize={85}
          output={'svg'}
        />
      </div>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.picContainer}> </div>
          <div className={classes.loginContainer}>
            <div className={classes.loginHeader}>로그인</div>
            {/* <div className={classes.loginHeader}>LogIn</div> */}
            <div className={classes.loginForm}>
              <form onSubmit={handleSubmit(handleLogin)}>
                <input
                  {...register('email')}
                  placeholder="이메일을 입력하세요."
                />
                <p className={classes.errorMsg}>{errors.email?.message}</p>
                <input
                  type="password"
                  {...register('password')}
                  placeholder="비밀번호를 입력하세요."
                />
                <p className={classes.errorMsg}>{errors.password?.message}</p>

                <div className={classes.login__submit}>
                  <CustomButton type="submit" disabled={!isValid}>
                    {loading && <span></span>}
                    <span>Login</span>
                  </CustomButton>
                </div>

                <p className={classes.subMenu}>
                  회원가입 하시겠습니까?{' '}
                  <Link to="/signup" className={classes.clickable}>
                    회원가입
                  </Link>
                </p>
                <span
                  className={`${classes.subMenu} ${classes.clickable}`}
                  onClick={showModal}
                >
                  비밀번호를 잊으셨나요?
                </span>
              </form>
              <div className={classes.otherLogin}>
                <SocialLoginButton onClick={googleLogin}>
                  <img src={logInGoogle} alt="구글로그인버튼" />
                </SocialLoginButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login2;
