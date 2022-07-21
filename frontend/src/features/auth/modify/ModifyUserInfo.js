// component
import Button from "../../../common/UI/Button";

//material UI
import { FormControl, Select, MenuItem, InputLabel, NativeSelect, TextField, Chip } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment from "moment";
// import Select from "../../../common/UI/Select";

// 단순 서버 API
// import {fetchHobbies} from './modifyAPI';

// state
import { useState, useRef, useEffect } from "react";
// redux
import {useSelector, useDispatch} from 'react-redux';
import { modifyActions, dispatchUserBasicInfo  } from "./modify-slice";
import {nameDupCheck} from "./modify-slice";
// router
// import { useHistory } from "react-router-dom";
// css
import classes from "./ModifyUserInfo.module.scss";


//tmp data 
import * as dataList from './data';

import axios from 'axios'
const nationOptions = dataList.nationOptions
const languageOptions = dataList.languageOptions
const API_URL = "http://127.0.0.1:8080/";

const ModifyUserInfo = () => {
  const [chipHobbies, setChipHobbies] = useState([]);
  
  // API 문서를 만들지 말지 고민
  useEffect(()=>{
    const fetchHobbies = async () => {
      const res = await axios.get(API_URL + 'favorite/list')
      console.log(res.data.data)
      setChipHobbies(res.data.data.map(item => { return {...item, isSelected:false}} ))
    }
    fetchHobbies() 
  },[])




  // const history = useHistory();
  const nickNameRef = useRef();
  
  // redux
  const userInfo = useSelector(state => state.modify)
  

  const dispatch = useDispatch();
  console.log('리덕스 테스트중', userInfo)
  
  
  
  
  const nickNameInputChangeHandler = () => {
    dispatch(modifyActions.setIsNameUnique(false))
  };

  const nickNameDupCheckHandler = async () => {
    const nickName = nickNameRef.current.value;
    
    if (nickName.trim() === "") {
      alert("아이디를 입력해주세요");
    } else {
      try {
        const response = await dispatch(nameDupCheck(nickName));
        const isDup = response.payload.data.data
        if (!isDup) {
          dispatch(modifyActions.setName(nickName));
          alert("사용 가능한 아이디입니다.");
        } else {
          dispatch(modifyActions.setName(''));
          alert("이미 존재하는 아이디입니다.");
        }


      } catch (error) {
        console.log(error)
      }     
    }
  };
  const changeGenderHandler = (event) => {
    const gender = event.target.value
    dispatch(modifyActions.setGender(gender))
  }
  const changeNationHandler = (event) => {
    const nationality = event.target.value
    dispatch(modifyActions.setNationality(nationality))
  }
  const changeTeachHandler = (event) => {
    const myLanguage = event.target.value

    dispatch(modifyActions.setMyLang(myLanguage))

  };
  const changeLearnHandler = (event) => {
    const yourLanguage = event.target.value
    dispatch(modifyActions.setYourLang(yourLanguage))

  };

    // material UI 날짜 관련 함수
    const birthdayChangeHandler = (changedDate) => {
      const m = moment(changedDate);
      const tmp = {
        birthYear: m.year(),
        birthMonth: m.month() + 1,
        birthDay: m.day()
      }

      dispatch(modifyActions.setBirthday(tmp))
    }
  


  const addHobbyHandler = (event) => {
    const hobbyId = Number(event.currentTarget.dataset.value);
    if (userInfo.favoriteList.length >= 3) return;

    dispatch(modifyActions.addFavorite(hobbyId))
    for (const obj of chipHobbies) {
      if (obj.id === hobbyId) {
        obj.isSelected = !obj.isSelected;
      }
    }
  };
  const removeHobbyHandler = (event) => {
    const hobbyId = Number(event.currentTarget.dataset.value);
    
    dispatch(modifyActions.removeFavorite(hobbyId))
    for (const obj of chipHobbies) {
      if (obj.id === hobbyId) {
        obj.isSelected = !obj.isSelected;
      }
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    console.log(userInfo);
    try {
      const response = await dispatch(dispatchUserBasicInfo(userInfo));
      console.log(response);
    } catch(error){
      console.log(error);
    }
    
    // history.push("/main");
  };

  let formIsValid = true;
  for (const key in userInfo) {
    // console.log(key, userInfo[key])
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
              {userInfo.isNameUnique ? '사용 가능': '중복 확인'}
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

      <h5>매칭 옵션</h5>
        <div className={`${classes.twoInputsContainer}`}>

        <div>
          <FormControl variant="standard" sx={{minWidth: 120, maxWidth:240}}>   
          <InputLabel id="nation-label">국적</InputLabel>

            <Select
              labelId="nation-label"
              id="nation"
              defaultValue={''}
              value={userInfo.nation}
              label="nation"
              inputProps={{
                name: 'nation',
                id: 'uncontrolled-native',
              }}
              onChange={changeNationHandler}
            >
              {nationOptions.map(item=>  (<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>) )}
            </Select>
            
            </FormControl>
        </div>
        <div>
        <FormControl variant="standard" sx={{minWidth: 120, maxWidth:240}}>  
        <InputLabel id="gender-label">성별</InputLabel>

        <Select
            labelId="gender-label"
            id="gender"
            defaultValue={''}
            value={userInfo.gender}
            label="gender"
            inputProps={{
              name: 'gender',
              id: 'uncontrolled-native',
            }}
            onChange={changeGenderHandler}
          >
            <MenuItem value="">성별 선택</MenuItem>
            <MenuItem value="MALE">남성</MenuItem>
            <MenuItem value="FEMALE">여성</MenuItem>            
            
          </Select>
          
          </FormControl>

        </div>

        </div>
     

          <div className={classes.languageSelectionContainer}>
            <div>

        <div>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          내 언어
        </InputLabel>
        <NativeSelect
          defaultValue={null}
          inputProps={{
            name: 'myLanguage',
            id: 'uncontrolled-native',
          }}
          onChange={changeTeachHandler}

        >
          {languageOptions.map(item => <option key={item.id} value={item.id}>{item.name}</option> )}

        </NativeSelect>
        </div>
        <div>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          학습 희망 언어
        </InputLabel>
        <NativeSelect
          defaultValue={null}
          inputProps={{
            name: 'learnLanguage',
            id: 'uncontrolled-native',
          }}
          onChange={changeLearnHandler}

        >
          {languageOptions.map(item => <option key={item.id} value={item.id}>{item.name}</option> )}

        </NativeSelect>
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
