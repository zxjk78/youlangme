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
// 리사이징 비율계산식
const imgRatioCalculate = (imgObj, size) => {
  let resultWidth = imgObj.width;
  let resultHeight = imgObj.height;
  const originSize = size;
  const compSize = 102400;
  const ratio = Math.ceil(Math.sqrt(originSize / compSize, 2)) * 2;
  resultWidth = resultWidth / ratio;
  resultHeight = resultHeight / ratio;
  return [resultWidth, resultHeight];
};

// 리사이징하고 싶은 canvas에 담고 파일화하는 작업
const loadToCanvas = (imgObj, size) => {
  const [width, height] = imgRatioCalculate(imgObj, size);
  // console.log(width, height);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(imgObj, 0, 0, width, height);
  //canvas의 dataurl를 blob(file)화 하는 과정
  const dataURL = canvas.toDataURL('image/png');
  const byteString = atob(dataURL.split(',')[1]);
  const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  //리사이징된 file 객체
  const tmpThumbFile = new Blob([ab], { type: mimeString });
  const refineFile = new File([tmpThumbFile], '123.jpg', {
    type: 'image/jpeg',
    lastModified: Date.now(),
  });

  return refineFile;
};

// file object인 image를 읽는 함수
const fileToImg = (file) => {
  const resultImg = new Image();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      resultImg.src = reader.result;
      resolve(resultImg);
    });
    reader.addEventListener('error', () => {
      reject();
    });
    reader.readAsDataURL(file);
  });
};

// 위 두 함수로 하는 이미지 리사이징
export const imgResizing = async (oldFile) => {
  const convertedImg = await fileToImg(oldFile);

  return loadToCanvas(convertedImg, oldFile.size);
};
