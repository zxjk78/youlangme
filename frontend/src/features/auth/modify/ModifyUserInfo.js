import Button from "../../../common/UI/Button";
import { Chip } from "@mui/material";
import Select from "../../../common/UI/Select";

import classes from "./ModifyUserInfo.scss";
import { useState, useRef } from "react";
import { nickname } from "../authSlice";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const languageOptions = ["한국어", "영어", "일본어", "중국어"];

const hobbys = [
  "영화",
  "스포츠",
  "음악",
  "재테크",
  "여행",
  "코딩",
  "게임",
  "맛집",
  "요리",
  "카페",
  "독서",
  "반려동물",
  "파티",
  "콜렉팅",
];

const hobbies2 = hobbys.map((hobby) => {
  return { hobby: hobby, isSelected: false };
});

const profileData = {
  nickName: "",
  hobbies: [],
  teachLanguage: "",
  learnLanguage: "",
};

const ModifyUserInfo = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const nickNameRef = useRef();
  const [profileInfo, setProfileInfo] = useState(profileData);

  const nickNameInputChangeHandler = () => {
    setProfileInfo((prevState) => {
      return { ...prevState, nickName: "" };
    });
  };
  const nickNameCheckHandler = () => {
    const newName = nickNameRef.current.value;

    if (newName.trim() === "") {
      alert("아이디 입력해주세요");
    } else {
      dispatch(nickname(newName));
      //백엔드 검사 로직
      setProfileInfo((prevState) => {
        return { ...prevState, nickName: newName };
      });
      alert("사용 가능한 아이디입니다.");
    }
  };
  const changeTeachHandler = (value) => {
    setProfileInfo((prevState) => {
      return { ...prevState, teachLanguage: value };
    });
  };
  const changeLearnHandler = (value) => {
    setProfileInfo((prevState) => {
      return { ...prevState, learnLanguage: value };
    });
  };
  const addHobbyHandler = (event) => {
    const hobby = event.currentTarget.dataset.value;
    if (profileInfo.hobbies.length >= 3) return;

    setProfileInfo((prevState) => {
      return { ...prevState, hobbies: [...prevState.hobbies, hobby] };
    });
    for (const obj of hobbies2) {
      if (obj.hobby === hobby) {
        obj.isSelected = !obj.isSelected;
      }
    }
  };
  const removeHobbyHandler = (event) => {
    const hobby = event.currentTarget.dataset.value;
    setProfileInfo((prevState) => {
      return {
        ...prevState,
        hobbies: prevState.hobbies.filter((item) => item !== hobby),
      };
    });

    for (const obj of hobbies2) {
      if (obj.hobby === hobby) {
        obj.isSelected = !obj.isSelected;
      }
    }
  };

  const onSubmitHandler = (event) => {
    // 제출 이전에 어떻게 비활성화를 시킬 것인가?
    event.preventDefault();

    console.log(profileInfo);
    history.push("/main");
  };

  let formIsValid = true;
  for (const key in profileInfo) {
    if (!profileInfo[key]) {
      formIsValid = false;
      break;
    }
  }

  return (
    <>
      <div className={classes.container}>
        <form onSubmit={onSubmitHandler}>
          <h4>닉네임</h4>
          <div className={classes.nicknameContainer}>
            <input
              type="text"
              id="nickname"
              ref={nickNameRef}
              onChange={nickNameInputChangeHandler}
            />
            <Button
              type="button"
              size="small"
              color="purple"
              onClick={nickNameCheckHandler}
            >
              중복확인
            </Button>
          </div>
          <br />
          <div className={classes.languageSelectionContainer}>
            <h4>언어 선택</h4>
            <div>
              <div>
                <h5>가르칠 언어</h5>
                <Select
                  topic="미선택"
                  options={languageOptions}
                  changeOptionHandler={changeTeachHandler}
                />
              </div>
              <div>
                <h5>배울 언어</h5>
                <Select
                  topic="미선택"
                  options={languageOptions}
                  changeOptionHandler={changeLearnHandler}
                />
              </div>
            </div>
          </div>
          <div className={classes.interestContainer}>
            <h4>흥미</h4>
            <p>
              관심 있는 분야를 선택해 주세요 <span>(최대 3개)</span>
            </p>
            {/* 이부분에 chips 로 여러 개를 만들어서 사용함 */}
            <div className={classes["chipsContaier"]}>
              {hobbies2.map((obj) => {
                return (
                  <Chip
                    key={obj.hobby}
                    label={obj.hobby}
                    onClick={
                      !obj.isSelected ? addHobbyHandler : removeHobbyHandler
                    }
                    data-value={obj.hobby}
                    color={obj.isSelected ? "secondary" : "default"}
                  />
                );
              })}
            </div>
          </div>
          <div className={classes.submitBtn}>
            <Button
              size={`large`}
              color={!formIsValid ? "grey" : "purple"}
              disabled={!formIsValid}
              rounded={"rounded"}
            >
              정보 등록
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ModifyUserInfo;
