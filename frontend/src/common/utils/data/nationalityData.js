// 내 국적 - 상대방의국적, 뉴스 검색 텍스트를 다르게
export const nationalityNewsMapping = {
  KOREA: {
    KOREA: '한국',
    USA: '미국',
    JAPAN: '일본',
    CHINA: '중국',
    SPAIN: '스페인',
  },
  USA: {
    KOREA: 'South Korea',
    USA: 'America',
    JAPAN: 'Japan',
    CHINA: 'China',
    SPAIN: 'Spain',
  },

  JAPAN: {
    KOREA: '韓国',
    USA: '米国',
    JAPAN: '日本',
    CHINA: '中国',
    SPAIN: 'スペイン',
  },
  CHINA: {
    KOREA: '韩国',
    USA: '美国',
    JAPAN: '日本',
    CHINA: '中国',
    SPAIN: '西班牙',
  },
  SPAIN: {
    KOREA: 'Corea',
    USA: 'América',
    JAPAN: 'Japón',
    CHINA: 'China',
    SPAIN: 'España',
  },
};

export const newsText = (myNation, yourNation) => {
  let result;
  switch (myNation) {
    case 'KOREA':
      result = `${nationalityNewsMapping[myNation][yourNation]}의 최근 소식`;
      break;
    case 'USA':
      result = `${nationalityNewsMapping[myNation][yourNation]} Today`;

      break;
    case 'JAPAN':
      result = '海外ニュース';
      break;
    case 'CHINA':
      result = '外电';
      break;
    case 'SPAIN':
      result = 'noticias mundiales';
      break;

    default:
      break;
  }
  return result;
};
