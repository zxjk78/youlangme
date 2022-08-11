import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

import { useHistory } from "react-router-dom"

import { fetchProfile, fetchProfileImg } from "../../profile/LeftProfile/LeftProfileAPI"
import axios from "axios"
import { API_URL, accessToken } from "../../../common/api/http-config"

const ConfirmChat = (props) => {
   
    const history = useHistory()
    const currentUser = useSelector((state) => state.auth.currentUser)
    const [MyInfo, setMyInfo] = useState(null)
    const [youInfo, setYouInfo] = useState(null)
    const [myImage, setMyImage] = useState(null)
    const [yourImage, setYourImage] = useState(null) 
    const [isLoading, setIsLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
      if(props.matchConfirm){
        setTimeout(() => {
          props.setOpponentId(null)
          props.setSessionId('')
          props.setMyData(null)
          props.setYourData(null)
          props.setMyProfile(null)
          props.setYourProfile(null)
          props.setMatchConfirm(false)
        }, 25000);
       
      }
      return ()=>{
        setMyInfo(null)
        setMyImage(null)
        setYouInfo(null)
        setYourImage(null)
  
      }
    }, [props.matchConfirm, loading])

    const matchingHandler = () =>{
      axios.post(API_URL + `meeting/enter/${props.sessionId}`, {yourlanguage: MyInfo.yourlanguage}, {  headers: {
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN': accessToken,
      }})
        .then((res) => 
        { console.log(res.data)
          history.push({
            pathname: '/match',
            state: {
              sessionId: props.sessionId,
              MyInfo: MyInfo,
              youInfo: youInfo
              }
          })
        })
        .catch((err) => console.log(err.message))
      
    }
  
    useEffect(()=>{
      (async () => {
     
        if(props.matchConfirm){
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
          props.setMyData(data)
          props.setMyProfile(dataImage)
          setIsLoading(false)
        }
      })()
    }, [props.matchConfirm, currentUser])

    
  useEffect(()=>{
    (async () => {
      if(props.matchConfirm){
        setIsLoading(true)
        const data1 = await fetchProfile(props.opponentId);
        const data1Image = await fetchProfileImg(props.opponentId);
        setYouInfo(data1)
        setYourImage(data1Image)
        props.setYourData(data1)
        props.setYourProfile(data1Image)
        setIsLoading(false)
      }
    })()
  }, [props.matchConfirm, props.opponentId])
    return <div><p>매칭 성공</p>
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
   
    <button onClick={matchingHandler}>매칭</button>
    </div> 
}

export default ConfirmChat