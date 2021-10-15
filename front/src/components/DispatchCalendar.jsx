import DayCard from './DayCard';
import '../styles/DispatchCalendar.scss';
import { getDaysInMonth, format } from 'date-fns';

const DispatchCalendar = () => {
  const today = new Date();
  const thisMonth = {
    name: format(today, 'MMMM'),
    year: format(today, 'yyyy'),
    days: getDaysInMonth(today)
  };

  const dayCards = [];
  for (let d = 1; d <= thisMonth.days; d++) {
    dayCards.push(<DayCard date={`${thisMonth.name} ${d}, ${thisMonth.year}`} />)
  }

  return (
    <>
      <h1>{thisMonth.name}</h1>
      {dayCards}
    </>
  );
};

export default DispatchCalendar