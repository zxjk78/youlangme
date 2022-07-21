import axios from "axios";
const API_URL = "http://127.0.0.1:8080/";

export const fetchHobbies = async () => {
    const response = await axios.get(API_URL + `favorite/list`);    
    console.log(1, response)
    console.log(2, response.data)
    console.log(3, response.data.data)
    return response.data.data;
}
