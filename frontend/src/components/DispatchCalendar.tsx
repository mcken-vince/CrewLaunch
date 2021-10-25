import DayCard from './DayCard';
import '../styles/DispatchCalendar.scss';
import { getDaysInMonth, format } from 'date-fns';
import { IthisMonth } from './component-types';
import { FC, ReactElement } from 'react';

const DispatchCalendar: FC<any> = (): ReactElement => {
  const today: Date = new Date();
  const thisMonth: IthisMonth = {
    name: format(today, 'MMMM'),
    year: format(today, 'yyyy'),
    days: getDaysInMonth(today)
  };

  const week: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const daysOfWeek: ReactElement[] = week.map(wd => <div className='weekday-container'>{wd}</div>)

  const dayCards: ReactElement[] = [];
  for (let d = 1; d <= thisMonth.days; d++) {
    const dayOfMonth: string = (0 < d && d < 10) ? `0${d}` : `${d}`;
    dayCards.push(<DayCard date={dayOfMonth} key={d} jobs={[]} />);
  }

  return (
    <div className='dispatch-calendar-container'>
      <h1>{`${thisMonth.name} ${thisMonth.year}`}</h1>
      <div className='dispatch-calendar-days-container'>
        {daysOfWeek}
        {dayCards}
      </div>
    </div>
  );
};

export default DispatchCalendar