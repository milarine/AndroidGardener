enum Months {
  JAN = 'January',
  FEB = 'February',
  MAR = 'March',
  APR = 'April',
  MAY = 'May',
  JUN = 'June',
  JUL = 'July',
  AUG = 'August',
  SEP = 'September',
  OCT = 'October',
  NOV = 'November',
  DEC = 'December',
}

const getMonth = (number: number): string => {
  switch (number) {
    case 1:
      return Months.JAN;
    case 2:
      return Months.FEB;
    case 3:
      return Months.MAR;
    case 4:
      return Months.APR;
    case 5:
      return Months.MAY;
    case 6:
      return Months.JUN;
    case 7:
      return Months.JUL;
    case 8:
      return Months.AUG;
    case 9:
      return Months.SEP;
    case 10:
      return Months.OCT;
    case 11:
      return Months.NOV;
    case 12:
      return Months.DEC;
  }
  return number.toString();
};

export const formatDate = (date: Date): string => {
  const dateInUserTimezone = date; // TODO

  let day = '' + dateInUserTimezone.getDate();
  if (day.length < 2) {
    day = '0' + day;
  }
  const month = getMonth(dateInUserTimezone.getMonth() + 1);
  const year = dateInUserTimezone.getFullYear();

  return [day, month, year].join(' ');
};

const daysBetween = (date1: Date, date2: Date): number => {
  const diffMs = Math.abs(date1.getTime() - date2.getTime());
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return Math.round(diffDays);
};

export const dateDifferenceString = (date1: Date, date2: Date): string => {
  const days = daysBetween(date1, date2);
  if (days === 0) {
    return 'today';
  } else if (days === 1) {
    return '1 day ago';
  } else if (days === 7) {
    return '1 week ago';
  } else if (days % 7 === 0) {
    return `${days / 7} weeks ago`;
  }
  return `${days} days ago`;
};
