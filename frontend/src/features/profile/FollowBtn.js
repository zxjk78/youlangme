import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { followUserProfile, unfollowUserProfile } from '../_actions/profileActions'

// 리덕스 안거치는 단순 서버 통신 API
import { sendFollow, sendUnfollow } from './FollowAPI';

//material UI
import { Button  } from '@mui/material';
import { grey } from '@mui/material/colors'

// css
import classes from './Follow.module.scss';


function FollowBtn({prfleId, flwrs, getIsFollowed}) {

    const [isFollowed, setIsFollowed] = useState(false);

    // redux
    const { currentUser } = useSelector((state) => state.auth);
    // const {userInfo} =userLogin
    const dispatch = useDispatch()

    const followHandler = async () => {
        sendFollow(prfleId)
        setIsFollowed(true)
        getIsFollowed(true)
    }
    const unfollowHandler = () => {
        sendUnfollow(prfleId)
        setIsFollowed(false)
        getIsFollowed(false)
    }


//     // 해당 프로필 유저의 팔로워들 중에서 currentUser의 id가 있으면 unfollow 버튼을 만들어주고 없으면 팔로우 버튼을 보여줌.
    useEffect(() => {
        if ( flwrs.find(follower=>follower.followerId === currentUser.id)) {setIsFollowed(true)}
    }, [flwrs, prfleId])

    return (
        <>
        {
            isFollowed
            ? <Button onClick={unfollowHandler} variant="contained" 
            size="small" fullWidth className={classes.unfollow} color="primary"
            sx={{borderRadius: '25px', letterSpacing: 3 }}>언팔로우</Button>

            : <Button onClick={followHandler} variant="contained" 
                size="small" fullWidth color="secondary"
                sx={{borderRadius: '25px', letterSpacing: 3 }}>팔로우</Button>
        }
        </>
    )
}


export default FollowBtn