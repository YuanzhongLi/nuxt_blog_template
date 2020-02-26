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

const formatUnixtimeForDivider = (unixTime) => {
  const d = new Date(unixTime);
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
  if (isJP(formattedDate)) {
    const [fullDate, time] = formattedDate.split(' ');
    let [year, month, dayWithWeekDay] = fullDate.split('/');
    let day = dayWithWeekDay.split('(')[0];
    const weekDay = `${dayWithWeekDay.split('(')[1][0]}曜日`;
    if (month.length === 3) {
      month = month.replace(' ', '');
    }
    if (day.length === 1) {
      day = `0${day}`;
    }
    return `${year}/${month}/${day} ${weekDay}`;
  }
  const [week, date, time] = formattedDate.split(',');
  let [month, day, year] = date.split('/');
  if (month.length === 2) {
    month = month.replace(' ', '0');
  } else if (month.length === 3) {
    month = month.replace(' ', '');
  }
  if (day.length === 1) {
    day = `0${day}`;
  }

  return `${year}/${month}/${day} ${week}`;
};

export default formatUnixtimeForDivider;
