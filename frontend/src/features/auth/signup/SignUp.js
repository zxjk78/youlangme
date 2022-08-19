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
        "The email must be between 3 and 20 characters.",
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("This field is required!"),

    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
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
      .catch(() => {
        setSuccessful(false);
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
