import { useSelector } from "react-redux/es/exports";
import { useState, useEffect } from "react";
import MuiSelect from "../../common/UI/MuiSelect";
import * as selectData from "../auth/modify/data";
import classes from "./StartMatching.module.scss";
import { fetchHobbies } from "../../features/auth/modify/modifyAPI";
import { Chip } from "@mui/material";
const StartMatching = () => {
  const { languageOptions } = selectData;
  const [chipHobbies, setChipHobbies] = useState([]);

  useEffect(() => {
    fetchHobbies(setChipHobbies);
  }, []);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [myLanguage, setMyLanguage] = useState(currentUser.myLanguage);
  const [yourLanguage, setYourLanguage] = useState(currentUser.yourLanguage);
  const [hobbyId, setHobbyId] = useState(null);
  const [hobbyName, setHobbyName] = useState("");

  const changeTeachHandler = (event) => {
    setMyLanguage(event.target.value);
  };
  const changeLearnHandler = (event) => {
    setYourLanguage(event.target.value);
  };

  const changeHobbyHandler = (event) => {
    event.preventDefault();
    if (hobbyId) {
      for (const obj of chipHobbies) {
        if (obj.id === hobbyId) {
          obj.isSelected = !obj.isSelected;
          setHobbyName("");
        }
      }
    }
    setHobbyId(Number(event.currentTarget.dataset.value));
    for (const obj of chipHobbies) {
      if (obj.id === hobbyId) {
        obj.isSelected = !obj.isSelected;
        setHobbyName(obj.name);
      }
    }
  };

  const removeHobbyHandler = (event) => {
    setHobbyId(null);
    for (const obj of chipHobbies) {
      if (obj.id === hobbyId) {
        obj.isSelected = !obj.isSelected;
        setHobbyName("");
      }
    }
  };

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
                selected={myLanguage}
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
                onChange={changeLearnHandler}
                optionList={languageOptions}
              />
            </div>
            <div className={classes.interestContainer}>
              <h4>상대방과 대화하고 싶은 주제를 골라주세요</h4>
              <div className={classes["chipsContaier"]}>
                {chipHobbies.map((obj) => {
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
