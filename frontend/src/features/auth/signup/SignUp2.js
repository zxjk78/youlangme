import React, { useState, useEffect } from 'react';

import { signup } from '../authSlice';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// module
import Trianglify from 'react-trianglify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// external component
import Box from '@mui/material/Box';

import CircularProgress from '@mui/material/CircularProgress';

import Button from '@mui/material/Button';
import styled from '@emotion/styled';
// css
import classes from './SignUp2.module.scss';

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

// yup schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('유효하지 않은 이메일 형식입니다.')
    .test(
      'len',
      '유효한 이메일을 입력해 주세요.',
      (val) =>
        val &&
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/.test(
          val
        )
    )
    .required('이메일을 입력해 주세요.'),
  password: Yup.string()
    .test(
      'len',
      '10 ~ 20글자의 영문자, 숫자, 특수문자의 조합으로 입력해 주세요.',
      (val) =>
        val &&
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,20}$/.test(
          val
        )
    )
    .required('비밀번호를 입력해 주세요'),
  checkPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호를 다시 입력해 주세요'),
});

const MySwal = withReactContent(Swal);

const SignUp2 = () => {
  const [successful, setSuccessful] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(validationSchema), mode: 'onChange' });

  const handleRegister = (formValue) => {
    const { email, password } = formValue;
    const data = {
      email,
      password,
    };
    setSuccessful(false);

    dispatch(signup(data))
      .unwrap()
      .then(() => {
        setSuccessful(true);
        history.push('/');
      })
      .catch((err) => {
        setSuccessful(false);
        MySwal.fire({
          icon: 'error',
          title: '회원가입 실패',
          text: '중복된 이메일입니다.',
        });
        history.push('/signup');
      });
  };

  return (
    <>
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
          variance={0.8}
          cellSize={85}
          output={'svg'}
        />
      </div>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.picContainer}> </div>
          <div className={classes.loginContainer}>
            {/* <div className={classes.loginHeader}>Sign Up</div> */}
            <div className={classes.loginHeader}>회원가입</div>
            <div className={classes.loginForm}>
              <form onSubmit={handleSubmit(handleRegister)}>
                {successful ? (
                  <div className={classes.signUpIngMsg}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <CircularProgress size="4rem" />
                    </Box>
                    <div>
                      회원가입 중입니다. <br />
                      잠시만 기다려 주세요...
                    </div>
                  </div>
                ) : (
                  <>
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
                    <p className={classes.errorMsg}>
                      {errors.password?.message}
                    </p>
                    <input
                      type="password"
                      {...register('checkPassword')}
                      placeholder="비밀번호를 다시 입력하세요."
                    />
                    <p className={classes.errorMsg}>
                      {errors.checkPassword?.message}
                    </p>

                    <div className={classes.login__submit}>
                      <CustomButton type="submit" disabled={!isValid}>
                        <span>SignUp</span>
                      </CustomButton>
                    </div>

                    <p className={classes.subMenu}>
                      로그인 하시겠습니까?{' '}
                      <Link to="/login" className={classes.clickable}>
                        로그인
                      </Link>
                    </p>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp2;
