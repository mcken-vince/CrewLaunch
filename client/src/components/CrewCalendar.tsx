import { IJobLocal, IthisWeek } from '../definitions';
import '../styles/CrewCalendar.scss';
import DayCard from './DayCard';
import { formatDate, getWeekObject } from '../helpers/dataFormatters';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import addDays from 'date-fns/addDays';


const CrewCalendar = (props: CrewCalendarProps) => {
  const today: Date = new Date();
  const [selectedWeek, setSelectedWeek] = useState<IthisWeek>(getWeekObject(today));
  const todaysDate = formatDate(today).split(' ');

  const selectNextWeek = () => {
    setSelectedWeek(prev => {
      return getWeekObject(addDays(new Date(prev.startDate), 7));
    });
  };

  const selectPreviousWeek = () => {
    setSelectedWeek(prev => {
      return getWeekObject(addDays(new Date(prev.startDate), -7));
    });
  };

  const selectThisWeek = () => {
    setSelectedWeek(getWeekObject(today));
  };

  return (
    <div className='crew-calendar-container'>
      <div className='crew-calendar-header'>
        <h2 className='crew-calendar-title'>
          {`${selectedWeek.monthName} ${selectedWeek.year}`}
        </h2>
        <div className='crew-calendar-buttons'>
          <Button onClick={selectThisWeek}>Today</Button>
          <Button onClick={selectPreviousWeek}>{'<<<'}</Button>
          <Button onClick={selectNextWeek}>{'>>>'}</Button>
        </div>
      </div>

    </div>
  );
};

export default CrewCalendar;

export interface CrewCalendarProps {
  jobs: IJobLocal[];
  markJobComplete: Function;
};