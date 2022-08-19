import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { fetchProfile } from "../../profile/LeftProfile/LeftProfileAPI";
import { fetchHobbies } from "../../auth/modify/modifyAPI";

import * as selectData from "../../auth/modify/data";
import { chipColors } from "../../profile/ProfileColorPalette";
import { startMatching } from "../matchSlice";
import { API_URL } from "../../../common/api/http-config";

import { Button, Chip, Stack, Typography } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import MuiSelect from "../../../common/UI/MuiSelect";
// import { CompareArrows } from "@material-ui/icons"
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

// css
import classes from "./StartMatch.module.scss";
import { grey } from "@mui/material/colors";

const ColorButton = styled(Button)(({ theme }) => ({
  // color: theme.palette.getContrastText(yellow[500]),
  fontSize: 34,
  fontWeight: 1000,
  lineHeight: 1.5,
  padding: "10px 20px",
  width: 320,

  border: "1px solid #CAD6E2",
  borderRadius: 16,
  backgroundColor: "#F0C325",
  "&:hover": {
    backgroundColor: "#D4AC1C",
  },
}));

const StartChat = (props) => {
  const myTheme = createTheme({
    palette: chipColors,
  });
  const colors = [
    "primary",
    "secondary",
    "warning",
    "success",
    "info",
    "error",
  ];

  const { languageOptions } = selectData;
  const currentUser = useSelector((state) => state.auth.currentUser);
  const userId = currentUser.id;
  const [myLanguage, setMyLanguage] = useState(currentUser.mylanguage);
  const [yourLanguage, setYourLanguage] = useState(currentUser.yourlanguage);
  const [isLoading, setIsLoading] = useState(true);

  const [favorite, setFavorite] = useState([]);
  const [hobbies, setHobbies] = useState([]);

  useEffect(() => {
    (async () => {
      const profileDetail = await fetchProfile(userId);
      if (profileDetail) {
        setFavorite(profileDetail.favorites);
      }
      setIsLoading(false);
      console.log("채팅", favorite);
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
    console.log("내언어변경");
    setMyLanguage(event.target.value);
  };
  const changeLearnHandler = (event) => {
    console.log("상대언어변경");
    setYourLanguage(event.target.value);
  };

  
  const startMatchingHandler = (event) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const accessToken = user ? user.accessToken : null;
    const header = {
      "Content-Type": "application/json",
      "X-Auth-Token": accessToken,
    };
    props.setMatchLoading(true);
    props.setMyLanguage(myLanguage);
    props.setYourLanguage(yourLanguage);
    axios
      .post(
        API_URL + "match",
        { mylanguage: myLanguage, yourlanguage: yourLanguage },
        {
          headers: header,
        }
      )
      .then((response) => {
        if (response.data.data.opponentId === -1){
          alert("매칭 상대가 잡히지 않았습니다.")
          props.setMatchLoading(false)
          props.setMyLanguage(null);
          props.setYourLanguage(null);
        }
        else {
          props.setSessionId(response.data.data.sessionId);
          props.setOpponentId(response.data.data.opponentId);
          props.setMatchLoading(false);
          props.setMatchConfirm(true);
        }
      })
      .catch((err) => {
        alert(err.message);
        props.setMyLanguage(null);
        props.setYourLanguage(null);
        props.setMatchLoading(false);
      });
  };

  return (
    <div className={classes.match_wrapper}>
      <div className={classes.match_start_container}>
        <div className={classes.match_start_left_container}>
          <div className={classes.match_left_header}>
            {/* <Typography gutterBottom component='span'
                sx={{ fontSize: 40, fontWeight: 'bold'}}
              >Me</Typography> */}
            <div className={classes.header_word}>Me</div>
            <SwapHorizIcon
              sx={{ fontSize: 60, mx: 5, mt: "4px", color: grey[500] }}
            />
            <div className={classes.header_word}>You</div>
          </div>
          <ThemeProvider theme={myTheme}>
            <div className={classes.hobbies_chips}>
              {hobbies.map((obj) => {
                return (
                  <Chip
                    key={obj.id}
                    label={obj.name}
                    data-value={obj.id}
                    color={colors[Math.floor(Math.random() * colors.length)]}
                    sx={{ color: "#F9F3EE", fontWeight: "bold" }}
                  />
                );
              })}
            </div>
          </ThemeProvider>

          <div className={classes.select_lngs}>
            {[myLanguage, yourLanguage].map((lng, idx, list) => {
              return (
                <MuiSelect
                  labelId={lng}
                  id={lng}
                  value={lng}
                  defaultValue={lng}
                  onChange={idx ? changeLearnHandler : changeTeachHandler}
                  optionList={languageOptions}
                />
              );
            })}
          </div>
        </div>

        <div className={classes.match_start_right_container}>
          <div className={classes.match_intro}>매칭을</div>
          <div className={classes.match_intro}>시작하시겠습니까?</div>
          <div className={classes.chosen_lngs}>
            <div className={classes.lng_grey}>Me</div>
            <div className={classes.lng_word}>{myLanguage}</div>
            <SwapHorizIcon sx={{ fontSize: 40, mx: 2, color: "white" }} />
            <div className={classes.lng_word}>{yourLanguage}</div>
            <div className={classes.lng_grey}>You</div>
          </div>
          <ColorButton
            variant="contained"
            sx={{ mt: 6 }}
            onClick={startMatchingHandler}
          >
            시작!
          </ColorButton>
        </div>
      </div>
    </div>
  );
};

export default StartChat;
