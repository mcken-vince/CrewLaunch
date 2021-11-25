import { IJobLocal, IShowDayDetails, IthisWeek } from '../definitions';
import '../styles/CrewCalendar.scss';
import DayCard from './DayCard';
import { formatDate, getWeekObject } from '../helpers/dataFormatters';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { addDays, isSameDay, format } from 'date-fns';
import JobsPage from './pages/JobsPage';
import JobsFullPageModal from './JobsFullPageModal';


const CrewCalendar = (props: CrewCalendarProps) => {
  const [showDayDetails, setShowDayDetails] = useState<IShowDayDetails>({show: false, day: {date: '', jobs: []}});
  const today: Date = new Date();
  const [selectedWeek, setSelectedWeek] = useState<IthisWeek>(getWeekObject(today));
  const { jobs, markJobComplete } = props;
  
  const selectDay = (date: string, jobs: IJobLocal[]): void => {
    setShowDayDetails({show: true, day: {date: date, jobs: jobs}});
  };

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

  const daysOfWeek: any = [];

  const dayCards = [];
  for (let d = 0; d < 7; d++) {
    let thisDay: Date = new Date(addDays(new Date(selectedWeek.startDate), d));
    const dateString: string = formatDate(thisDay);
    const day: string = format(thisDay, 'dd');
    const todayJobs: IJobLocal[] = jobs ? jobs.filter((job: IJobLocal) => isSameDay(new Date(job.date), thisDay)) : [];
    dayCards.push(
      <DayCard 
        jobs={todayJobs} 
        date={day} 
        key={d} 
        isToday={isSameDay(new Date(), thisDay)}
        selectDay={() => selectDay(dateString, todayJobs)}
      />);
    thisDay = new Date(addDays(thisDay, 1));
  };

  // for (let d = 1; d <= selectedMonth.days; d++) {
  //   const dayOfMonth: string = (0 < d && d < 10) ? `0${d}` : `${d}`;
  //   const todayJobs: IJobLocal[] = jobs ? jobs.filter((job: IJobLocal) => isSameDay(new Date(job.date), new Date(`${selectedMonth.name} ${d}, ${selectedMonth.year}`))) : [];
  //   const isToday = (dayOfMonth === todaysDate[2].slice(0, 2) && selectedMonth.name === todaysDate[1] && selectedMonth.year.toString() === todaysDate[3]) ? true : false;
  //   dayCards.push(<DayCard date={dayOfMonth} key={d} jobs={todayJobs} selectDay={():void => selectDay(`${selectedMonth.name} ${d}, ${selectedMonth.year}`, todayJobs)} isToday={isToday} />);
  // };

  return (
    <div className='crew-calendar-container'>
      <div className='crew-calendar-header'>
        <h2 className='crew-calendar-title'>
          {selectedWeek.startMonthName === selectedWeek.endMonthName ? 
            `${selectedWeek.startMonthName}` : `${selectedWeek.startMonthName} - ${selectedWeek.endMonthName}`} {selectedWeek.year}
        </h2>
        <div className='crew-calendar-buttons'>
          <Button onClick={selectThisWeek}>Today</Button>
          <Button onClick={selectPreviousWeek}>{'<<<'}</Button>
          <Button onClick={selectNextWeek}>{'>>>'}</Button>
        </div>
      </div>
      <div className='crew-calendar-days-container'>
        {daysOfWeek}
        {dayCards}
      </div>

      <JobsFullPageModal
      show={showDayDetails.show}
      onHide={() => setShowDayDetails({show: false, day: {date: '', jobs: []}})}
      jobs={showDayDetails.day.jobs}
      date={showDayDetails.day.date}
      markJobComplete={markJobComplete}
    />
    </div>
  );
};

export default CrewCalendar;

export interface CrewCalendarProps {
  jobs: IJobLocal[];
  markJobComplete: Function;
};