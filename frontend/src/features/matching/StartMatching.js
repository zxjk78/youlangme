import { useSelector } from "react-redux/es/exports";
import { useState, useEffect, useMemo } from "react";
import MuiSelect from "../../common/UI/MuiSelect";
import * as selectData from "../auth/modify/data";
import classes from "./StartMatching.module.scss";
import { fetchProfile } from "../profile/LeftProfile/LeftProfileAPI";
import { Chip } from "@mui/material";
import { fetchHobbies } from "../auth/modify/modifyAPI";
const StartMatching = () => {
  const { languageOptions } = selectData;
  const currentUser = useSelector((state) => state.auth.currentUser);
  const userId = currentUser.id
  const [userInfo, setUserInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [favorite, setFavorite] = useState([]);
  const [fetchedFavorite, setFetchedFavorite] = useState([]);
  const [hobbies, setHobbies] = useState([])
  useEffect(() => {
    ( 
      async () => {
        const profileDetail = await fetchProfile(userId);
        if (profileDetail){
          setUserInfo(profileDetail);
          setFavorite(profileDetail.favorites)

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
        return favorite.includes(obj.id)
      })
      const hobbiesList = userFavoriteList.map((obj)=>{
        return {...obj, isSelected:false}
      })
      setHobbies(hobbiesList)
      setIsLoading(false);
    })();
  }, [favorite]);


 



  // console.log(userInfo['favorites'])
  const [myLanguage, setMyLanguage] = useState(currentUser.mylanguage);
  const [yourLanguage, setYourLanguage] = useState(currentUser.yourlanguage);
  const [hobbyId, setHobbyId] = useState(null);
  const [hobbyName, setHobbyName] = useState("");
 
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
  console.log(hobbies)

  const changeTeachHandler = (event) => {
    setMyLanguage(event.target.value);
  };
  const changeLearnHandler = (event) => {
    setYourLanguage(event.target.value);
  };

  const changeHobbyHandler = (event) => {
    event.preventDefault();
    setHobbyId(Number(event.currentTarget.dataset.value))
    for (const obj of hobbies) {
      if (obj.id === hobbyId) {
        obj.isSelected = true
        setHobbyName(obj.name)
      } else {
        obj.isSelected = false
      }
    }
  }



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
                labelId="yourLanguage-label"
                id="yourLanguage"
                value={yourLanguage}
                defaultValue={yourLanguage}
                onChange={changeLearnHandler}
                optionList={languageOptions}
              />
            </div>
            <div className={classes.interestContainer}>
              <h4>상대방과 대화하고 싶은 주제를 골라주세요</h4>
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
        <button>시작!</button>
      </div>
    </div>
  );
};

export default StartMatching;
