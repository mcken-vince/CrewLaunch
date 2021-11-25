import DayCard from './DayCard';
import '../styles/DispatchCalendar.scss';
import { isSameDay, addMonths } from 'date-fns';
import { useState, FC, ReactElement, useMemo } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import JobCard from './JobCard';
import JobsFullPageModal from './JobsFullPageModal';
import { formatDate, getMonthObject } from '../helpers/dataFormatters';
import { ICrew, IthisMonth, IJobLocal, IShowDayDetails } from '../definitions';

const DispatchCalendar: FC<any> = (props: DispatchCalendarProps): ReactElement => {
  const [showDayDetails, setShowDayDetails] = useState<IShowDayDetails>({show: false, day: {date: '', jobs: []}});
  const today: Date = new Date();
  const [selectedMonth, setSelectedMonth] = useState<IthisMonth>(getMonthObject(today));
  const todaysDate = formatDate(today).split(' ');
  
  const { jobs, crews, assignJobToCrew, markJobComplete } = props;

  // Opens a canvas of this day's jobs with details
  const selectDay = (date: string, jobs: IJobLocal[]): void => {
    setShowDayDetails({show: true, day: {date: date, jobs: jobs}});
  };
  
  const selectPreviousMonth = () => {
    setSelectedMonth(prev => {
      const date = new Date(`${prev.name} 1, ${prev.year}`);
      const minusMonth = addMonths(date, -1);
      const previousMonth = getMonthObject(minusMonth);
      return previousMonth;
    });
  };
  
  const selectNextMonth = () => {
    setSelectedMonth(prev => {
      const date = new Date(`${prev.name} 1, ${prev.year}`);
      const addMonth = addMonths(date, 1);
      const nextMonth = getMonthObject(addMonth);
      return nextMonth;
    });
  };
  
  const selectCurrentMonth = () => {
    const thisMonth = getMonthObject(new Date());
    setSelectedMonth(thisMonth);
  };

  const week: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysOfWeek: ReactElement[] = week.map((wd, idx) => <div key={idx} className='weekday-container'><h3>{wd}</h3></div>);
  
  const dayCards: ReactElement[] = [];
  
  for (let d = 1; d <= selectedMonth.days; d++) {
    const dayOfMonth: string = (0 < d && d < 10) ? `0${d}` : `${d}`;
    const todayJobs: IJobLocal[] = jobs ? jobs.filter((job: IJobLocal) => isSameDay(new Date(job.date), new Date(`${selectedMonth.name} ${d}, ${selectedMonth.year}`))) : [];
    const isToday = (dayOfMonth === todaysDate[2].slice(0, 2) && selectedMonth.name === todaysDate[1] && selectedMonth.year.toString() === todaysDate[3]) ? true : false;
    dayCards.push(<DayCard date={dayOfMonth} key={d} jobs={todayJobs} selectDay={():void => selectDay(`${selectedMonth.name} ${d}, ${selectedMonth.year}`, todayJobs)} isToday={isToday} />);
  };

  // Adds prevMonth DayCards to beginning of dayCards list
  for (let prevMonthDay = 1; prevMonthDay <= selectedMonth.startsOn; prevMonthDay++) {
    const dayCardDate = (selectedMonth.prevMonthDays + 1 - prevMonthDay).toString();
    const dateString: string = `${selectedMonth.prevMonthName} ${dayCardDate}, ${selectedMonth.prevMonthYear}`;
    const todayJobs = jobs.filter(j => isSameDay(new Date(j.date), new Date(dateString)));
    dayCards.unshift(
      <DayCard 
        date={dayCardDate} 
        key={prevMonthDay + selectedMonth.days} 
        jobs={todayJobs}
        selectDay={() => selectDay(dateString, todayJobs)}
      />);
  };

  const activeCrews: ICrew[] = useMemo(() => crews.filter(c => c.is_active), [crews]);

  const jobsToShow: IJobLocal[] = useMemo(() => jobs ? jobs.filter((job: IJobLocal) => isSameDay(new Date(job.date), new Date(`${selectedMonth.name} ${showDayDetails.day.date}, ${selectedMonth.year}`))) : [], [showDayDetails, jobs, selectedMonth]);


  return (
    <div className='dispatch-calendar-container'>
      <div className='dispatch-calendar-header'>
        <h1 className='dispatch-calendar-title'>{`${selectedMonth.name} ${selectedMonth.year}`}</h1>
        <div className='dispatch-calendar-buttons'>
          <Button onClick={selectCurrentMonth}>Today</Button>
          <Button onClick={selectPreviousMonth}>{'<<<'}</Button>
          <Button onClick={selectNextMonth}>{'>>>'}</Button>
        </div>
      </div>
      <div className='dispatch-calendar-days-container'>
        {daysOfWeek}
        {dayCards}
      </div>

    <JobsFullPageModal 
      show={showDayDetails.show}
      onHide={() => setShowDayDetails({show: false, day: {date: '', jobs: []}})}
      jobs={jobsToShow}
      date={showDayDetails.day.date}
      markJobComplete={markJobComplete}
      activeCrews={activeCrews}
      assignJobToCrew={assignJobToCrew}
    />

    </div>
  );
};

export default DispatchCalendar;

export interface DispatchCalendarProps {
  jobs: IJobLocal[];
  crews: ICrew[];
  assignJobToCrew: Function;
  markJobComplete: Function;
};