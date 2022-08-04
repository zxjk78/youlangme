import * as moment from 'moment';
import 'moment/locale/ko';

// 날짜 데이터 받아서 방금 전, 몇 시간 전, 하루 넘어가면 Date text로 변환하는 함수
export const createdDateCal = (createdDate, isDetail = true) => {
  if (isDetail) {
    const created = moment(createdDate).format('YYYY-MM-DD HH:mm');
    return created;
  } else {
    // 요약 피드에서 보일 때 ~ 분 ~ 시간 전 ... 날짜
    const m = moment(createdDate);
    // 1일 이상 밀리면 어제, 몇시 로

    if (m.isBefore(moment().subtract(1, 'days'))) {
      return '어제 ' + moment(createdDate).format('HH:mm');
    } else if (m.isBefore(moment().subtract(2, 'days'))) {
      // 2일 이상 밀리면 1년 이상 밀렸는지 보고 날짜로
      if (m.isBefore(moment().subtract(1, 'years'))) {
        return moment(createdDate).format('YYYY-MM-DD');
      }

      return moment(createdDate).format('MM-DD');
    }
    return m.fromNow();
  }
};

// resizing 과정에서 data url을 blob으로 만드는 함수
const dataURItoBlob = (dataURI) => {
  const bytes =
    dataURI.split(',')[0].indexOf('base64') >= 0
      ? atob(dataURI.split(',')[1])
      : unescape(dataURI.split(',')[1]);
  const mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const max = bytes.length;
  const ia = new Uint8Array(max);
  for (let i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
  return new Blob([ia], { type: mime });
};

// file object인 image를 리사이징하는 함수

export const imageResize = async (files) => {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    console.log(file);
    console.log(file.preview);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      console.log(dataURItoBlob(reader.result));
    });
  }
};
