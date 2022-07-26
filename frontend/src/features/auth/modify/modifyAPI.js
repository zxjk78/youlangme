import axios from 'axios';
const API_URL = 'http://127.0.0.1:8080/';



// 리덕스랑 관련없는 서버 통신 API들 모음
// chips에 담을 hobby 데이터 fetch

export const fetchHobbies = async (setHobbiesFn) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const accessToken = user ? user.accessToken : null;
  const getConfig = { headers: { 'X-Auth-Token': accessToken } };
  
  console.log('fetch 취미');
  // const response = await axios.get(API_URL + `favorite/list`);
  const response = await axios.get(
    API_URL + `favorite/list`,
    // 엑세스 토큰이 필요하다.
    getConfig
  );
  console.log(response);
  setHobbiesFn(
    response.data.data.map((item) => {
      return { ...item, isSelected: false };
    })
  );
};
