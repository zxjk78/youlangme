// component
import Button from "../../../common/UI/Button";

//material UI
import { TextField, Chip } from "@mui/material";
import MuiSelect from "../../../common/UI/MuiSelect";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import moment from "moment";

// 리덕스 안거치는 단순 서버 통신 API
import { fetchHobbies } from "./modifyAPI";

// state
import { useState, useRef, useEffect } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { modifyActions, dispatchUserBasicInfo } from "./modifySlice";
import { nameDupCheck } from "./modifySlice";
// router
import { useHistory } from "react-router-dom";
// css
import classes from "./ModifyUserInfo.module.scss";

//하드코딩한 데이터
import * as selectData from "./selectData";
const { nationOptions, languageOptions, genderOptions } = selectData;

const ModifyUserInfo = () => {
  const [chipHobbies, setChipHobbies] = useState([]);

  useEffect(() => {
    fetchHobbies(setChipHobbies);
  }, []);

  const history = useHistory();
  const nickNameRef = useRef();

  // redux
  const userInfo = useSelector((state) => state.modify);
  const dispatch = useDispatch();
  console.log("리덕스 테스트:", userInfo);

  // eventHandler
  const nickNameInputChangeHandler = () => {
    dispatch(modifyActions.setIsNameUnique(false));
  };

  const nickNameDupCheckHandler = async () => {
    const nickName = nickNameRef.current.value;

    if (nickName.trim() === "") {
      alert("아이디를 입력해주세요");
    } else {
      try {
        const response = await dispatch(nameDupCheck(nickName));
        // const isDup = response.payload.data.data
        const isDup = response.payload.data;
        console.log(isDup);
        if (!isDup) {
          dispatch(modifyActions.setName(nickName));
          alert("사용 가능한 아이디입니다.");
        } else {
          dispatch(modifyActions.setName(""));
          alert("이미 존재하는 아이디입니다.");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const changeGenderHandler = (event) => {
    const gender = event.target.value;
    dispatch(modifyActions.setGender(gender));
  };
  const changeNationHandler = (event) => {
    const nationality = event.target.value;
    dispatch(modifyActions.setNationality(nationality));
  };
  const changeTeachHandler = (event) => {
    const myLanguage = event.target.value;
    dispatch(modifyActions.setMyLang(myLanguage));
  };
  const changeLearnHandler = (event) => {
    const yourLanguage = event.target.value;
    dispatch(modifyActions.setYourLang(yourLanguage));
  };

  // material UI 날짜 관련 함수
  const birthdayChangeHandler = (changedDate) => {
    const m = moment(changedDate).toObject();
    const tmp = {
      birthYear: m.years,
      birthMonth: m.months + 1,
      birthDay: m.date,
    };
    dispatch(modifyActions.setBirthday(tmp));
  };
  const addHobbyHandler = (event) => {
    const hobbyId = Number(event.currentTarget.dataset.value);
    if (userInfo.favoriteList.length >= 3) return;

    dispatch(modifyActions.addFavorite(hobbyId));
    for (const obj of chipHobbies) {
      if (obj.id === hobbyId) {
        obj.isSelected = !obj.isSelected;
      }
    }
  };
  const removeHobbyHandler = (event) => {
    const hobbyId = Number(event.currentTarget.dataset.value);

    dispatch(modifyActions.removeFavorite(hobbyId));
    for (const obj of chipHobbies) {
      if (obj.id === hobbyId) {
        obj.isSelected = !obj.isSelected;
      }
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      dispatch(dispatchUserBasicInfo(userInfo))
        .unwrap()
        .then(() => {
          document.location.href = "/main";
        });
    } catch (error) {
      console.log(error);
    }
  };

  let formIsValid = true;
  for (const key in userInfo) {
    if (!userInfo[key] || userInfo.favoriteList.length === 0) {
      formIsValid = false;
      break;
    }
  }

  return (
    <>
      <div className={classes.container}>
        <div className={`${classes.formContainer}`}>
          <form onSubmit={onSubmitHandler}>
            <h5>닉네임</h5>
            <div className={`${classes.nicknameContainer}`}>
              <input
                type="text"
                id="nickname"
                ref={nickNameRef}
                onChange={nickNameInputChangeHandler}
              />

              <Button
                type="button"
                size="small"
                color="nicknameDupCheck"
                onClick={nickNameDupCheckHandler}
                onChange={nickNameInputChangeHandler}
              >
                {userInfo.isNameUnique ? "사용 가능" : "중복 확인"}
              </Button>
            </div>
            <h5>생년월일</h5>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                // label="생년월일"
                inputFormat="yyyy-MM-dd"
                value={new Date(Object.values(userInfo.birthday))}
                onChange={birthdayChangeHandler}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <div className={`${classes.twoInputsContainer}`}>
              <div>
                <MuiSelect
                  labelId="nation-label"
                  id="nation"
                  value={userInfo.nation}
                  selectName="국적"
                  onChange={changeNationHandler}
                  optionList={nationOptions}
                />
              </div>
              <div>
                <MuiSelect
                  labelId="gender-label"
                  id="gender"
                  value={userInfo.gender}
                  selectName="성별"
                  onChange={changeGenderHandler}
                  optionList={genderOptions}
                />
              </div>
            </div>

            <div className={classes.languageSelectionContainer}>
              <div>
                <div>
                  <MuiSelect
                    labelId="myLanguage-label"
                    id="myLanguage"
                    value={userInfo.myLanguage}
                    selectName="내 언어"
                    onChange={changeTeachHandler}
                    optionList={languageOptions}
                  />
                </div>
                <div>
                  <MuiSelect
                    labelId="yourLanguage-label"
                    id="yourLanguage"
                    value={userInfo.yourLanguage}
                    selectName="학습 언어"
                    onChange={changeLearnHandler}
                    optionList={languageOptions}
                  />
                </div>
              </div>
            </div>
            <div className={classes.interestContainer}>
              <p>
                관심 있는 분야를 선택해 주세요 <span>(최대 3개)</span>
              </p>
              {/* 이부분에 chips 로 여러 개를 만들어서 사용함 */}
              <div className={classes["chipsContaier"]}>
                {chipHobbies.map((obj) => {
                  return (
                    <Chip
                      key={obj.id}
                      label={obj.name}
                      onClick={
                        !obj.isSelected ? addHobbyHandler : removeHobbyHandler
                      }
                      data-value={obj.id}
                      color={obj.isSelected ? "warning" : "default"}
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
      </div>
    </>
  );
};

export default ModifyUserInfo;
