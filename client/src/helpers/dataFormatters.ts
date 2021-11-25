import { format, getDaysInMonth, getDay, addMonths, addDays } from 'date-fns';
import { IthisMonth, IthisWeek } from '../definitions';

export const formatDate = (date: string | Date): string => {
  return format(new Date(date), 'eeee MMMM dd, yyyy');
};

export const getWeekObject = (date: Date): IthisWeek => {
  const thisDate: Date = new Date(date);
  const thisWeek: IthisWeek = {
    startDate: thisDate,
    endDate: addDays(thisDate, 7),
    year: format(thisDate, 'yyyy'),
    monthName: format(thisDate, 'MMMM'),
    daysInMonth: getDaysInMonth(thisDate)
  };
  return thisWeek;
};

export const getMonthObject = (date: Date) => {
  const thisDate: Date = new Date(date);
  const prevMonth = addMonths(thisDate, -1);
  const thisMonth: IthisMonth = {
    startsOn: 0,
    name: format(thisDate, 'MMMM'),
    year: format(thisDate, 'yyyy'),
    days: getDaysInMonth(thisDate),
    today: parseInt(format(thisDate, 'dd')),
    prevMonthName: format(prevMonth, 'MMMM'),
    prevMonthDays: getDaysInMonth(prevMonth),
    prevMonthYear: format(prevMonth, 'yyyy')
  };  
  // Calculate which day of the week the selected month starts on
  thisMonth.startsOn = getDay(new Date(`${thisMonth.name} 1, ${thisMonth.year}`));
  
  return thisMonth;
};

export const calculateContractStatus = (startDate: Date, endDate: Date): IContractStatus => {
  const today: Date = new Date();
  let status: IContractStatus;
  if (new Date(endDate) < today) {
    status = 'Complete';
  } else if (new Date(startDate) > today) {
    status = 'Upcoming';
  } else {
    status = 'Active';
  }
  return status;
};

type IContractStatus = 'Active' | 'Complete' | 'Upcoming';