import { format, getDaysInMonth, getDay, addMonths } from 'date-fns';
import { IthisMonth } from '../definitions';

export const formatDate = (date: string | Date): string => {
  return format(new Date(date), 'eeee MMMM dd, yyyy');
};

export const getMonthObject = (date: Date) => {
  const prevMonth = addMonths(new Date(date), -1);
  const thisMonth: IthisMonth = {
    startsOn: 0,
    name: format(date, 'MMMM'),
    year: format(date, 'yyyy'),
    days: getDaysInMonth(date),
    today: parseInt(format(date, 'dd')),
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