import axios from 'axios';
import { nationalityNewsMapping } from '../../common/utils/data/nationalityData';
import { API_URL } from '../../common/api/http-config';

export const fetchNews2 = async (myCountry, yourCountry) => {
  const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;
  // 그냥 중국은 버림
  if (
    myCountry === 'CHINA' ||
    (myCountry === 'JAPAN' && yourCountry === 'CHINA')
  ) {
    return { articles: [] };
  }
  const oppoCountry = nationalityNewsMapping[myCountry][yourCountry];
  try {
    const response = await axios.get(
      `${API_URL}meeting/news?countryName=${oppoCountry}`,
      {
        headers: { 'X-Auth-Token': accessToken },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const translate = async (myLangCode, yourLangCode, content) => {
  const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;

  try {
    const response = await axios.post(
      `${API_URL}meeting/translate`,
      {
        myLanguage: myLangCode,
        yourLanguage: yourLangCode,
        content: content,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': accessToken,
        },
      }
    );
    // console.log(response);
    return response.data.data.translate;
  } catch (error) {
    console.log(error);
  }
};
