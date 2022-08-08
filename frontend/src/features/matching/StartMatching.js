import { useDispatch, useSelector } from "react-redux/es/exports";
import { useState, useEffect, useMemo } from "react";
import MuiSelect from "../../common/UI/MuiSelect";
import * as selectData from "../auth/modify/data";
import classes from "./StartMatching.module.scss";
import { fetchProfile, fetchProfileImg } from "../profile/LeftProfile/LeftProfileAPI";
import { Chip } from "@mui/material";
import { fetchHobbies } from "../auth/modify/modifyAPI";
import { resetMatching, startMatching } from "./matchSlice";
import { useHistory } from "react-router-dom";
import axios from "axios";
const StartMatching = () => {
  const { languageOptions } = selectData;
  const currentUser = useSelector((state) => state.auth.currentUser);
  const opponentId = useSelector((state) => state.match.opponentId)
  const userId = currentUser.id;
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [favorite, setFavorite] = useState([]);
  const [fetchedFavorite, setFetchedFavorite] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [matchLoading, setMatchLoading] = useState(false);
  const [matchConfirm, setMatchConfirm] = useState(false);

  const [myLanguage, setMyLanguage] = useState(currentUser.mylanguage);
  const [yourLanguage, setYourLanguage] = useState(currentUser.yourlanguage);
  const [hobbyId, setHobbyId] = useState(null);
  const [hobbyName, setHobbyName] = useState("");
  const dispatch = useDispatch();
  const history = useHistory()
  const startMatchingHandler = (event) => {
    setMatchLoading(true);

    console.log(matchLoading);
    console.log({myLanguage, yourLanguage})
    dispatch(startMatching({mylanguage: myLanguage, yourlanguage:yourLanguage}))
      .unwrap()
      .then(() => {
        setMatchLoading(false);
        setMatchConfirm(true);
      })
      .catch(() => {
        setMatchLoading(false);
      });
  };
  useEffect(() => {
    (async () => {
      const profileDetail = await fetchProfile(userId);
      if (profileDetail) {
        setUserInfo(profileDetail);
        setFavorite(profileDetail.favorites);
      }
      setIsLoading(false);
    })();
  }, [userId]);


  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const hobbies = await fetchHobbies();
      // console.log(hobbies);
      setFetchedFavorite(hobbies);
      const userFavoriteList = hobbies.filter((obj) => {
        return favorite.includes(obj.id);
      });
      const hobbiesList = userFavoriteList.map((obj) => {
        return { ...obj, isSelected: false };
      });
      setHobbies(hobbiesList);
      setIsLoading(false);
    })();
  }, [favorite]);



  // 매칭 확인 화면
  const [MyInfo, setMyInfo] = useState(null)
  const [youInfo, setYouInfo] = useState(null)
  const [myImage, setMyImage] = useState(null)
  const [yourImage, setYourImage] = useState(null) 
  useEffect(()=>{
    if(matchConfirm){
      setTimeout(() => {
        dispatch(resetMatching())
        setMatchConfirm(false)
      }, 25000);
     
    }
    return ()=>{
      setMyInfo(null)
      setMyImage(null)
      setYouInfo(null)
      setYourImage(null)

    }
  }, [matchConfirm])

  useEffect(()=>{
    (async () => {
   
      if(matchConfirm){
        setIsLoading(true)
        const data = await fetchProfile(currentUser.id);
        if (!data) {
          history.replace({
            pathname: '/404',
            message: '존재하지 않는 게시물입니다.',
          });
        }
        const dataImage = await fetchProfileImg(currentUser.id);
        setMyInfo(data)
        setMyImage(dataImage)
        setIsLoading(false)
      }
    })()
  }, [matchConfirm, currentUser])

  useEffect(()=>{
    (async () => {
      if(matchConfirm){
        setIsLoading(true)
        const data1 = await fetchProfile(opponentId);
        const data1Image = await fetchProfileImg(opponentId);
        setYouInfo(data1)
        setYourImage(data1Image)
        setIsLoading(false)
      }
    })()
  }, [matchConfirm, opponentId])

  // console.log(userInfo['favorites'])

  // setHobbies((prev)=>{
  //   for (const obj of fetchedFavorite){
  //     if (favorite.includes(obj.id)){
  //       const tmp = {...obj, isSelected:false}
  //       return [...prev, tmp]
  //    }
  //   }
  // })
  // const userFavoriteList = []
  // for (const obj of fetchedFavorite){
  //   if (favorite.includes(obj.id)){
  //     const tmp = {...obj, isSelected:false}
  //     userFavoriteList.push(tmp)
  //   }
  // }
  // const userFavoriteList = fetchedFavorite.filter((obj) => {
  //   return favorite.includes(obj.id)
  // })

  const changeTeachHandler = (event) => {
    setMyLanguage(event.target.value);
  };
  const changeLearnHandler = (event) => {
    setYourLanguage(event.target.value);
  };

  const changeHobbyHandler = (event) => {
    event.preventDefault();
    setHobbyId(Number(event.currentTarget.dataset.value));
    for (const obj of hobbies) {
      if (obj.id === hobbyId) {
        obj.isSelected = true;
        setHobbyName(obj.name);
      } else {
        obj.isSelected = false;
      }
    }
  };
  const matchConfirmHandler = (event) => {
    setMatchConfirm(false)
    history.push('/match')
  }
  if (!matchLoading && !matchConfirm) {
    return (
      <div className={classes.container}>
        <div className={`${classes.formContainer}`}>
          <div className={classes.languageSelectionContainer}>
            <div>
              <div>
                <h4>Me</h4>
                <MuiSelect
                  labelId="myLanguage-label"
                  id="myLanguage"
                  value={myLanguage}
                  defaultValue={myLanguage}
                  onChange={changeTeachHandler}
                  optionList={languageOptions}
                />
              </div>
              <div>
                <h4>You</h4>
                <MuiSelect
                  labelId="youLanguage-label"
                  id="youLanguage"
                  value={yourLanguage}
                  defaultValue={yourLanguage}
                  onChange={changeLearnHandler}
                  optionList={languageOptions}
                />
              </div>
              <div className={classes.interestContainer}>
                <div className={classes["chipsContaier"]}>
                  {hobbies.map((obj) => {
                    return (
                      <Chip
                        key={obj.id}
                        label={obj.name}
                        onClick={changeHobbyHandler}
                        data-value={obj.id}
                        color={obj.isSelected ? "warning" : "default"}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2>매칭을 시작하시겠습니까?</h2>
          <div>{hobbyName}</div>
          <div>
            <p>{myLanguage}</p>
            <p>{yourLanguage}</p>
          </div>
          <button onClick={startMatchingHandler}>시작!</button>
        </div>
      </div>
    );
  } else if (matchLoading) {
    return (
      <div>
        <p>로딩중</p>
      </div>
    );
  } else if (!matchLoading && matchConfirm ) {
    return (
      <div>
        <p>매칭 성공</p>
        {MyInfo && myImage && (
        <div>
          <p>{MyInfo.name}</p>
          <p>{MyInfo.nationality}</p>
          <img src={myImage}></img>
        </div>)}
        {youInfo && yourImage &&(
        <div>
          <p>{youInfo.name}</p>
          <p>{youInfo.nationality}</p>
          <img src={yourImage}></img>
        </div>)}
       
        <button onClick={matchConfirmHandler}>매칭</button>
      </div>
    );
  }
};
export default StartMatching;
