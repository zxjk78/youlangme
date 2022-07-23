import axios from 'axios';
const API_URL = 'http://127.0.0.1:8080/';
// 리덕스랑 관련없는 서버 통신 API들 모음
// chips에 담을 hobby 데이터 fetch
export const fetchHobbies = async (setHobbiesFn) => {
  console.log('fetch 취미');
  const response = await axios.get(API_URL + `favorite/list`);
  console.log(response);
  setHobbiesFn(
    response.data.data.map((item) => {
      return { ...item, isSelected: false };
    })
  );
};
