import * as moment from 'moment';
import 'moment/locale/ko';

export const createdDateCal = (createdDate, isDetail = true) => {
  if (isDetail) {
    const created = moment(createdDate).format('YYYY-MM-DD HH:mm');
    return created;
  } else {
    // 요약 피드에서 보일 때 ~ 분 ~ 시간 전 ... 날짜
    const m = moment(createdDate);
    if (m.isBefore(moment().subtract(1, 'days'))) {
      // 1일 이상 밀리면 1년 이상 밀렸는지 보고 날짜로
      if (m.isBefore(moment().subtract(1, 'years'))) {
        return moment(createdDate).format('YYYY-MM-DD');
      }

      return moment(createdDate).format('MM-DD');
    }
    return m.fromNow();
  }
};
