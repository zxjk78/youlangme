import React from 'react'
import { useSelector } from 'react-redux'

import UserCard from './UserCard'

// mui material
import { Box, Typography  } from "@mui/material";

function Followers({followers, setShowFollowers}) {
    // const userLogin = useSelector(state => state.userLogin)
    // const {userInfo} = userLogin

    return (
      <Box >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modals
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
            // <div>
            //     <h5 className="text-center">Followers</h5>
            //     <hr />
            //     <div className="follow_content">
            //         {
            //           followers.map(follower=>(
            //               <UserCard key = {follower.id} user = {follower} setShowFollowers={setShowFollowers} />
            //           ))
            //         }
            //     </div>
            //     <div className="close" onClick={()=>setShowFollowers(false)}>&times;</div>

            // </div>
    )
}

export default Followers