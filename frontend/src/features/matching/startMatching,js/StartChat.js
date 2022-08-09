import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Chip } from "@mui/material"
import MuiSelect from "../../../common/UI/MuiSelect"
import * as selectData from "../../auth/modify/data"
import { fetchProfile } from "../../profile/LeftProfile/LeftProfileAPI"
import { fetchHobbies } from "../../auth/modify/modifyAPI"
import { startMatching } from "../matchSlice"
import { API_URL, accessToken } from "../../../common/api/http-config";
import axios from "axios"
const StartChat = (props) => {
    const { languageOptions } = selectData
    const currentUser = useSelector((state) => state.auth.currentUser)
    const userId = currentUser.id
    const [isLoading, setIsLoading] = useState(true)
    const [favorite, setFavorite] = useState([])
    const [hobbies, setHobbies] = useState([]);
    const [myLanguage, setMyLanguage] = useState(currentUser.mylanguage);
    const [yourLanguage, setYourLanguage] = useState(currentUser.yourlanguage);
 
    useEffect(() => {
        (async () => {
          const profileDetail = await fetchProfile(userId);
          if (profileDetail) {
            setFavorite(profileDetail.favorites);
          }
          setIsLoading(false);
        })();
      }, [userId]);

    useEffect(() => {
        (async () => {
          const hobbies = await fetchHobbies();
          const userFavoriteList = hobbies.filter((obj) => {
            return favorite.includes(obj.id);
          });
          const hobbiesList = userFavoriteList.map((obj) => {
            return { ...obj };
          });
          setHobbies(hobbiesList);
          setIsLoading(false);
        })();
      }, [favorite]);

    const changeTeachHandler = (event) => {
        setMyLanguage(event.target.value);
    };
    const changeLearnHandler = (event) => {
        setYourLanguage(event.target.value);
    };
      
   

    const header = {
        "Content-Type": "application/json",
        "X-Auth-Token": accessToken,
    };
    const startMatchingHandler = (event) => {
        props.setMatchLoading(true)
        axios.post(API_URL+"match", {mylanguage:myLanguage, yourlanguage:yourLanguage}, {
            headers: header,
        }).then((response)=>{
            props.setSessionId(response.data.data.sessionId)
            props.setOpponentId(response.data.data.opponentId)
            props.setMatchLoading(false);
            props.setMatchConfirm(true);
        }).catch((err)=>{
            alert(err.message)
            props.setMatchLoading(false);
        })

        
        // dispatch(startMatching({mylanguage:myLanguage, yourlanguage:yourLanguage}))
        //   .unwrap()
        //   .then(() => {
        //     props.setMatchLoading(false);
        //     props.setMatchConfirm(true);
        //   })
        //   .catch(() => {
        //     props.setMatchLoading(false);
        //   });
      };
    

    return  <div>
    <div>
      <div>
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
          <div>
            <div>
              {hobbies.map((obj) => {
                return (
                  <Chip
                    key={obj.id}
                    label={obj.name}
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
      <div>
        <p>{myLanguage}</p>
        <p>{yourLanguage}</p>
      </div>
      <button onClick={startMatchingHandler}>시작!</button>
    </div>
  </div> 

}

export default StartChat