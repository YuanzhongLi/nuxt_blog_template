/* eslint-disable prefer-const */
/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
const correspondDic = {
  Sun: '日曜日',
  Mon: '月曜日',
  Tue: '火曜日',
  Wed: '水曜日',
  Thu: '木曜日',
  Fri: '金曜日',
  Sat: '土曜日',
};

const isJP = formattedDate => formattedDate.split(',').length === 1;

const formatUnixTimeToJPtime = (unixTime) => {
  const d = new Date(unixTime);
  const now = new Date(Number(Date.now()));
  const diffFromNow = now - d;
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    hour12: false,
    minute: 'numeric',
  };
  const formattedDate = d.toLocaleString('jp-JP', options);
  const formattedNow = now.toLocaleString('jp-JP', options);
  if (isJP(formattedDate)) {
    const [fullDate, time] = formattedDate.split(' ');
    const [nowFullDate, nowTime] = formattedNow.split(' ');
    let [year, month, dayWithWeekDay] = fullDate.split('/');
    const [nowYear, nowMonth, nowDayWithWeekDay] = nowFullDate.split('/');
    let day = dayWithWeekDay.split('(')[0];
    const weekDay = `${dayWithWeekDay.split('(')[1][0]}曜日`;
    if (month.length === 3) {
      month = month.replace(' ', '');
    }
    if (day.length === 1) {
      day = `0${day}`;
    }
    if (fullDate === nowFullDate) {
      return time;
    } else if (diffFromNow < (1000 * 60 * 60 * 24 * 6)) {
      return weekDay;
    } else if (year === nowYear) {
      return `${month}/${day}`.replace(' ', '0');
    } else {
      return `${year}/${month}/${day}`.replace(' ', '0');
    }
  }
  let [week, date, time] = formattedDate.split(',');
  let [month, day, year] = date.split('/');
  const [nowweek, nowdate, nowtime] = formattedNow.split(',');
  const [nowmonth, nowday, nowyear] = nowdate.split('/');
  if (month.length === 2) {
    month = month.replace(' ', '0');
  } else if (month.length === 3) {
    month = month.replace(' ', '');
  }
  if (day.length === 1) {
    day = `0${day}`;
  }

  if (date === nowdate) {
    return time;
  } else if (diffFromNow < (1000 * 60 * 60 * 24 * 6)) {
    return correspondDic[week];
  } else if (year === nowyear) {
    return `${month}/${day}`.replace(' ', '0');
  } else {
    return `${year}/${month}/${day}`.replace(' ', '0');
  }
};

export default formatUnixTimeToJPtime;
