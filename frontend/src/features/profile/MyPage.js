// // component
// import Button from '../../../common/UI/Button';

//material UI
import { Chip } from '@mui/material';

// component 
import ProfileImage from './ProfileImage'


// 리덕스 안거치는 단순 서버 통신 API
import { fetchProfile, fetchDescription } from './ProfileAPI';

// state
import { useState, useRef, useEffect } from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';

// router
import { useParams } from 'react-router-dom';

// css
import classes from './MyPage.module.scss';




const MyPage = () => {
  const params = useParams();
  const [profileInfo, setProfileInfo] = useState(null);

  const [profileDescription, setProfileDescription] = useState('');
  // console.log(params.userId);

  useEffect(() => {
    fetchProfile(setProfileInfo, params.userId);
    
    fetchDescription(setProfileDescription, params.userId);
  }, []);


  
  const colors = [ "primary", "secondary", "success", "info", "error", "warning" ]
  // const chosenColor = colors[Math.floor(Math.random()*colors.length)]

  
  // // 의존성에 fetchProfile 추가하면 fetchProfile에 useCallback 함수로.



  // const history = useHistory();
  // const nickNameRef = useRef();

  // // redux
  // const userInfo = useSelector((state) => state.modify);
  // const dispatch = useDispatch();
  // console.log('리덕스 테스트:', userInfo);

  // // eventHandler
  // const nickNameInputChangeHandler = () => {
  //   dispatch(modifyActions.setIsNameUnique(false));
  // };

  // const nickNameDupCheckHandler = async () => {
  //   const nickName = nickNameRef.current.value;

  //   if (nickName.trim() === '') {
  //     alert('아이디를 입력해주세요');
  //   } else {
  //     try {
  //       const response = await dispatch(nameDupCheck(nickName));
  //       // const isDup = response.payload.data.data
  //       const isDup = response.payload.data;
  //       console.log(isDup);
  //       if (!isDup) {
  //         dispatch(modifyActions.setName(nickName));
  //         alert('사용 가능한 아이디입니다.');
  //       } else {
  //         dispatch(modifyActions.setName(''));
  //         alert('이미 존재하는 아이디입니다.');
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };
  // const changeGenderHandler = (event) => {
  //   const gender = event.target.value;
  //   dispatch(modifyActions.setGender(gender));
  // };
  // const changeNationHandler = (event) => {
  //   const nationality = event.target.value;
  //   dispatch(modifyActions.setNationality(nationality));
  // };
  // const changeTeachHandler = (event) => {
  //   const myLanguage = event.target.value;
  //   dispatch(modifyActions.setMyLang(myLanguage));
  // };
  // const changeLearnHandler = (event) => {
  //   const yourLanguage = event.target.value;
  //   dispatch(modifyActions.setYourLang(yourLanguage));
  // };

  // // material UI 날짜 관련 함수
  // const birthdayChangeHandler = (changedDate) => {
  //   const m = moment(changedDate);
  //   const tmp = {
  //     birthYear: m.year(),
  //     birthMonth: m.month() + 1,
  //     birthDay: m.day(),
  //   };
  //   dispatch(modifyActions.setBirthday(tmp));
  // };
  // const addHobbyHandler = (event) => {
  //   const hobbyId = Number(event.currentTarget.dataset.value);
  //   if (userInfo.favoriteList.length >= 3) return;

  //   dispatch(modifyActions.addFavorite(hobbyId));
  //   for (const obj of chipHobbies) {
  //     if (obj.id === hobbyId) {
  //       obj.isSelected = !obj.isSelected;
  //     }
  //   }
  // };
  // const removeHobbyHandler = (event) => {
  //   const hobbyId = Number(event.currentTarget.dataset.value);

  //   dispatch(modifyActions.removeFavorite(hobbyId));
  //   for (const obj of chipHobbies) {
  //     if (obj.id === hobbyId) {
  //       obj.isSelected = !obj.isSelected;
  //     }
  //   }
  // };

  // const onSubmitHandler = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await dispatch(dispatchUserBasicInfo(userInfo));
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   history.push('/main');
  // };

  // let formIsValid = true;
  // for (const key in userInfo) {
  //   if (!userInfo[key] || userInfo.favoriteList.length === 0) {
  //     formIsValid = false;
  //     break;
  //   }
  // }

  return (
    <div>
      <h1>My Page</h1>
      <ProfileImage />
      
      {profileInfo && profileDescription && 
        <div>
          <h2>{profileInfo.name}</h2>
          <p>{profileDescription}</p>
          <br />
          <p>me:  {profileInfo.mylanguage}</p>
          <p>you:  {profileInfo.yourlanguage}</p>
          <div>
            {profileInfo.favorites.map((fav) => {
              return (
                <Chip
                  key={profileInfo.favorites.indexOf(fav)}
                  label={fav} 
                  color={colors[Math.floor(Math.random()*colors.length)]}
                />
              );
            })}
          </div>
        </div>
      }
    </div>
  );
};

export default MyPage;
