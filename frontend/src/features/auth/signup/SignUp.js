import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { signup } from "../authSlice";
import classes from "./SignUp.module.scss";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const history = useHistory();
  const [successful, setSuccessful] = useState(false);
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
    checkPassword: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .test(
        "len",
        "이메일 형식으로 입력하세요.",
        (val) =>
          val && /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/.test(val)
         
      )
      .required("This field is required!"),

    password: Yup.string()
      .test(
        "len",
        "패스워드는 10글자 이상 20글자 이하의 영어, 숫자, 특수문자의 조합입니다.",
        (val) =>
          val &&
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,20}$/.test(
            val
          )

      )
      .required("This field is required!"),

    checkPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "패스워드가 일치하지 않습니다.")
      .required("비밀번호를 입력하세요"),
  });

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
        history.push("/");
      })
      .catch((err) => {
        setSuccessful(false);
        alert("회원가입이 실패했습니다.")
        history.push("/signup");
      });
  };

  return (
    <div className={classes.register}>
      <div className={classes.register__wrap}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form className={classes.register__form}>
            {!successful && (
              <div>
                <h2>SIGN UP</h2>
                <div className={classes.register__id}>
                  <label htmlFor="email">Email</label>
                  <Field
                    name="email"
                    type="text"
                    placeholder="이메일을 입력하세요."
                  />
                  <ErrorMessage name="email" component="div" />
                </div>

                <div className={classes.register__pw}>
                  <label htmlFor="password">Password</label>
                  <Field
                    name="password"
                    type="password"
                    placeholder="비밀번호를 입력하세요."
                  />
                  <ErrorMessage name="password" component="div" />
                </div>

                <div className={classes.register__pw}>
                  <label htmlFor="checkPassword">CheckPassword</label>
                  <Field
                    name="checkPassword"
                    type="password"
                    placeholder="비밀번호를 입력하세요."
                  />
                  <ErrorMessage name="checkPassword" component="div" />
                </div>

                <div className={classes.register__submit}>
                  <button type="submit">Sign Up</button>
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>

      {/* {message && (
        <div>
          <div role="alert">{message}</div>
        </div>
      )} */}
    </div>
  );
};

export default SignUp;
