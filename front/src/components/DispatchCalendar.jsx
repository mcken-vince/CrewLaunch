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
    const dayOfMonth = (0 < d && d < 10) ? `0${d}` : `${d}`;
    dayCards.push(<DayCard date={dayOfMonth} key={d}/>)
  }

  return (
    <div className='dispatch-calendar-container'>
      <h1>{`${thisMonth.name} ${thisMonth.year}`}</h1>
      <div className='dispatch-calendar-days-container'>
        {dayCards}
      </div>
    </div>
  );
};

export default DispatchCalendar