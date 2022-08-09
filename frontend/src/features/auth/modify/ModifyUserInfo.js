// component
import Button from '../../../common/UI/Button';

//material UI
import { TextField, Chip, IconButton } from '@mui/material';
import MuiSelect from '../../../common/UI/MuiSelect';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import CancelIcon from '@mui/icons-material/Cancel';
import { grey } from '@mui/material/colors';

import moment from 'moment';
// redux
import { useDispatch } from 'react-redux';
import { getUser } from '../authSlice';
import { modalActions } from '../../../common/UI/Modal/modalSlice';
// 단순 서버 통신 API
import { fetchHobbies, nameDupCheck, dispatchUserBasicInfo } from './modifyAPI';

// state
import { useState, useRef, useEffect } from 'react';
// router
import { useHistory } from 'react-router-dom';

// 기타 라이브러리
import _ from 'lodash';

// css
import classes from './ModifyUserInfo.module.scss';

//하드코딩한 데이터
import * as staticData from './data';

const ModifyUserInfo = (props) => {
  // profile 안에서 모달로 부르는 방식이면, props로 받는 것도 가능함, ?. 연산자 + || 연산자 이용 = 프로퍼티가 존재 안하면
  // props 랑 연산자 이용해서 재사용 시도해보기?

  // ?. 는 property 읽을 때 null이나 undefined에서 꺼내오려는 시도면 cannot read undefined 에러 없이
  // undefined 반환하는 연산자
  // const props.userInfo = { ...props.userInfo };

  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedFavorite, setFetchedFavorite] = useState([]);

  const [name, setName] = useState(props.userInfo?.name || '');
  const [gender, setGender] = useState(props.userInfo?.gender || '');
  const [myLang, setMyLang] = useState(props.userInfo?.mylanguage || '');
  const [yourLang, setYourLang] = useState(props.userInfo?.yourlanguage || '');
  const [isNameUnique, setIsNameUnique] = useState(
    props.userInfo ? true : false
  );
  const [needDupCheck, setNeedDupCheck] = useState(false);

  const [userFavoriteList, setUserFavoriteList] = useState(
    props.userInfo?.favorites || []
  );
  const [nationality, setNationality] = useState(
    props.userInfo?.nationality || ''
  );
  const nameRef = useRef();
  const [birthDay, setbirthDay] = useState(
    props.userInfo?.birthDay || '2000-01-01'
  );

  const formIsValid =
    userFavoriteList.length > 0 &&
    isNameUnique &&
    birthDay &&
    gender &&
    myLang &&
    yourLang &&
    nationality;

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const hobbies = await fetchHobbies();
      // console.log(hobbies);
      setFetchedFavorite(hobbies);

      setIsLoading(false);
    })();
  }, []);

  // eventHandlers
  const nameInputChangeHandler = () => {
    const name = nameRef.current.value;
    if (name.trim().length > 0) {
      setNeedDupCheck(() => true);
    } else {
      setNeedDupCheck(() => false);
    }

    setIsNameUnique(() => false);
  };

  const nameDupCheckHandler = async () => {
    const name = nameRef.current.value;
    if (name.trim() === '') {
      alert('아이디를 입력해주세요');
      return;
    }
    try {
      const isDup = await nameDupCheck(name);
      // console.log('중복검사', isDup);
      if (!isDup || name === props.userInfo?.name) {
        alert('사용 가능한 아이디입니다.');
        setName((prevState) => name);
        setIsNameUnique(() => true);
      } else {
        alert('이미 존재하는 아이디입니다.');
        setIsNameUnique(() => false);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const genderHandler = (event) => {
    const gender = event.target.value;
    setGender(gender);
  };
  const nationalityHandler = (event) => {
    const nationality = event.target.value;
    setNationality(nationality);
  };
  const myLangHandler = (event) => {
    const myLanguage = event.target.value;
    setMyLang(myLanguage);
  };
  const yourLangHandler = (event) => {
    const yourLanguage = event.target.value;
    setYourLang(yourLanguage);
  };

  // material UI 날짜 관련 함수
  const birthDayChangeHandler = (changedDate) => {
    const m = moment(changedDate).format('YYYY-MM-DD');

    setbirthDay((prevState) => m);
  };
  const addHobbyHandler = (event) => {
    const hobbyId = Number(event.currentTarget.dataset.value);
    // console.log('add', hobbyId, userFavoriteList);

    if (userFavoriteList.length >= 3) return;
    setUserFavoriteList((prevState) => [...prevState, hobbyId]);
    for (const obj of fetchedFavorite) {
      if (obj.id === hobbyId) {
        obj.isSelected = true;
      }
    }
  };
  const removeHobbyHandler = (event) => {
    const hobbyId = Number(event.currentTarget.dataset.value);
    // console.log('remove', hobbyId, userFavoriteList);
    if (userFavoriteList.length === 0) return;
    setUserFavoriteList((prevState) =>
      prevState.filter((item) => item !== hobbyId)
    );
    for (const obj of fetchedFavorite) {
      if (obj.id === hobbyId) {
        obj.isSelected = false;
      }
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const tmpUserInfo = {
      name,
      nationality,
      gender,
      birthDay,
      myLanguage: myLang,
      yourLanguage: yourLang,
      favoriteList: userFavoriteList,
    };

    const isUpdate = props.userInfo ? true : false;
    try {
      const response = await dispatchUserBasicInfo(tmpUserInfo, isUpdate);
      if (response.success) {
        dispatch(getUser()).then(() => {
          if (!props.userInfo) {
            history.replace('/main');
          }
          dispatch(modalActions.offModal());
          // document.location.reload();
          history.go(0);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeHandler = () => {
    dispatch(modalActions.offModal());
    return;
  };

  return (
    <>
      <div className={classes.container}>
        {props.userInfo && (
          <div className={classes.formCancel}>
            <IconButton sx={{ width: '35px', height: '35px'}} onClick={closeHandler}>
              <CancelIcon sx={{ color: grey[400], fontSize: 30 }} />
            </IconButton>
          </div>
        )}
        <div className={`${classes.formContainer}`}>
          <form onSubmit={onSubmitHandler}>
            <h5>닉네임</h5>
            <div className={`${classes.nicknameContainer}`}>
              <input
                type="text"
                id="name"
                ref={nameRef}
                defaultValue={props.userInfo?.name || name}
                placeholder="닉네임을 입력해 주세요"
                onChange={nameInputChangeHandler}
              />
              <button
                className={`${classes.nicknameCheckBtn} ${
                  needDupCheck && classes.needDupCheck
                } ${isNameUnique && classes.uniqueName}`}
                type="button"
                onClick={nameDupCheckHandler}
                onChange={nameInputChangeHandler}
              >
                {isNameUnique ? '사용 가능' : '중복 확인'}
              </button>
            </div>

            <div className={classes.birthdayContainer}>
              <h5>생년월일</h5>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  views={['year', 'month', 'day']}
                  inputFormat="yyyy-MM-dd"
                  value={birthDay}
                  onChange={birthDayChangeHandler}
                  renderInput={(params) => <TextField {...params} />}
                  disabled={props.userInfo ? true : false}
                />
              </LocalizationProvider>
            </div>

            <div className={`${classes.nationGenderContainer}`}>
              <div>
                <MuiSelect
                  labelId="nation-label"
                  id="nation"
                  value={nationality}
                  selectName="국적"
                  onChange={nationalityHandler}
                  optionList={staticData.nationOptions}
                />
              </div>
              <div>
                <MuiSelect
                  labelId="gender-label"
                  id="gender"
                  value={gender}
                  selectName="성별"
                  onChange={genderHandler}
                  optionList={staticData.genderOptions}
                  disabled={props.userInfo ? true : false}
                />
              </div>
            </div>

            <div className={classes.languageSelectionContainer}>
              <div>
                <div>
                  <MuiSelect
                    labelId="myLanguage-label"
                    id="myLanguage"
                    value={myLang}
                    selectName="내 언어"
                    onChange={myLangHandler}
                    optionList={staticData.languageOptions}
                  />
                </div>
                <div>
                  <MuiSelect
                    labelId="yourLanguage-label"
                    id="yourLanguage"
                    value={yourLang}
                    selectName="학습 언어"
                    onChange={yourLangHandler}
                    optionList={staticData.languageOptions}
                  />
                </div>
              </div>
            </div>
            <div className={classes.interestContainer}>
              <p>
                상대방과 대화하고 싶은 주제를 <br /> 3개까지 선택해 주세요{' '}
                <span className={classes.interestCnt}>
                  ({userFavoriteList.length} / 3)
                </span>
              </p>
              {/* 이부분에 chips 로 여러 개를 만들어서 사용함 */}
              <div className={classes.chipsContaier}>
                {isLoading ? (
                  <div>로딩중</div>
                ) : (
                  fetchedFavorite.map((obj) => {
                    return (
                      <Chip
                        key={obj.id}
                        label={staticData.favorites[obj.id]}
                        onClick={
                          userFavoriteList.includes(Number(obj.id))
                            ? removeHobbyHandler
                            : addHobbyHandler
                        }
                        data-value={obj.id}
                        color={
                          userFavoriteList.includes(obj.id) || obj.isSelected
                            ? _.sample(staticData.chipColor)
                            : 'default'
                        }
                        variant={
                          userFavoriteList.includes(obj.id) || obj.isSelected
                            ? ''
                            : 'outlined'
                        }
                      />
                    );
                  })
                )}
              </div>
            </div>
            <div className={classes.submitBtn}>
              <Button
                size={`large`}
                color={!formIsValid ? 'grey' : 'purple'}
                disabled={!formIsValid}
                rounded={'rounded'}
              >
                {!props.userInfo ? '정보 등록' : '정보 수정'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ModifyUserInfo;
