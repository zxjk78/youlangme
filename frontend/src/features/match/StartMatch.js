import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchHobbies } from "../auth/modify/modifyAPI";


const StartMatch = () => {
    const [selectedHobby, setSelectedHobby] = useState('')
    const {currentUser} = useSelector((state) => state.auth)
    const [chipHobbies, setChipHobbies] = useState([]);
    const addHobbyHandler = (event) => {
        let hobbyId = Number(event.currentTarget.dataset.value);
        setSelectedHobby(chipHobbies[hobbyId])          
    }
        
    const removeHobbyHandler = (event) => {
        let hobbyId = Number(event.currentTarget.dataset.value);
        setSelectedHobby('')
    }
    
    useEffect(()=>{
        fetchHobbies(setChipHobbies)
    }, [])

    return <div>
        <div> 
            {chipHobbies.map((obj)=>{
                return <div key={obj.id} label={obj.name} onClick={!obj.isSelected ? addHobbyHandler : removeHobbyHandler} data-value={obj.id}></div>
            })}
        </div>
        <div>
            <h3>매칭하시겠습니까</h3>
            <div>
                <div>
                    {selectedHobby}
                </div>
                <div>
                    {currentUser.mylanguage}
                </div>
                <div>
                    {currentUser.yourlanguage}
                </div>
            </div>
            <div>
                <button>매칭 성공</button>
            </div>
        </div>
    </div>
}
export default StartMatch