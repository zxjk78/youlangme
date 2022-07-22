import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "../authSlice";

import classes from "./Login.module.scss";
import { Link, useHistory } from "react-router-dom";

const Login = (props) => {
  const [loading, setLoading] = useState(false);

  // const { message } = useSelector((state) => state.message);
  const history = useHistory();
  const dispatch = useDispatch();
  // const { isLoggedIn } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   dispatch(clearMessage());
  // }, [dispatch]);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleLogin = (formValue) => {
    const { email, password } = formValue;
    const data = {
      email,
      password,
    };
    console.log(data);

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        history.push("/modify");
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const googleLogin = () => {
    // dispatch(socialLogin())
    //   .unwrap()

    //   .catch(() => {
    //     setLoading(false);
    //   });
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <div className={classes.login}>
      <div className={classes.login__form}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <h2>LOGIN</h2>
            <div className={classes.login__id}>
              <label htmlFor="email">Email</label>
              <Field
                name="email"
                type="text"
                placeholder="이메일을 입력하세요."
              />
              <ErrorMessage name="email" component="div" />
            </div>
            <div className={classes.login__pw}>
              <label htmlFor="password">Password</label>
              <Field
                name="password"
                type="password"
                placeholder="비밀번호를 입력하세요."
              />
              <ErrorMessage name="password" component="div" />
            </div>

            <div className={classes.login__submit}>
              <button type="submit">
                {loading && <span></span>}
                <span>Login</span>
              </button>
            </div>
          </Form>
        </Formik>

        <button onClick={googleLogin}>테스트용 구글</button>
        <Link to="/signup">회원가입 하시겠습니까?</Link>
      </div>
    </div>
  );
};

export default Login;
