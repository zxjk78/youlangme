import axios from "axios";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { modalActions } from "../../../common/UI/Modal/modalSlice";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const API_URL = "http://127.0.0.1:8080/";
  // cors 에러 남. 백엔드 수정 필요
  const sendPasswordRequest = async (email) => {
    try {
      const email = emailRef.current.value;
      const response = await axios.post(API_URL + `findPwd/${email}`);
      alert("임시 비밀번호가 발급되었습니다.");
      dispatch(modalActions.offModal());
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h3>이메일을 입력하세요</h3>
      <div>
        <input type="text" ref={emailRef} />
      </div>
      <div>
        <button onClick={sendPasswordRequest}>임시 비밀번호 발급</button>
      </div>
    </div>
  );
};

export default ChangePassword;
