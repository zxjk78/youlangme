import axios from 'axios';
import { nationalityNewsMapping } from '../../common/utils/data/nationalityData';
import { API_URL } from '../../common/api/http-config';
import { defineNewsActive } from '../../common/utils/functions/commonFunctions';
export const fetchNews2 = async (myCountry, yourCountry) => {
  const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;

  if (!defineNewsActive(myCountry, yourCountry)) {
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
