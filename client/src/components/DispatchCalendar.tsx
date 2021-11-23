import DayCard from './DayCard';
import '../styles/DispatchCalendar.scss';
import { isSameDay, addMonths, getDaysInMonth } from 'date-fns';
import { IthisMonth, IJobLocal } from './component-types';
import { useState, FC, ReactElement, useMemo } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import JobCard from './JobCard';
import { formatDate, getMonthObject } from '../helpers/dataFormatters';
import { ICrew } from '../definitions';

const DispatchCalendar: FC<any> = (props: DispatchCalendarProps): ReactElement => {
  const [showDayDetails, setShowDayDetails] = useState<IShowDayDetails>({show: false, day: {date: 0, jobs: []}});
  const today: Date = new Date();
  const todaysDate = formatDate(today);
  const [selectedMonth, setSelectedMonth] = useState<IthisMonth>(getMonthObject(today));
  
  const { jobs, crews, assignJobToCrew, markJobComplete } = props;
  
  const prevMonthDays: number = getDaysInMonth(addMonths(new Date(), -1));

  // Opens a canvas of this day's jobs with details
  const selectDay = (date: number, jobs: IJobLocal[]): void => {
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
    dayCards.push(<DayCard date={dayOfMonth} key={d} jobs={todayJobs} selectDay={():void => selectDay(d, todayJobs)} />);
  };

  // Adds blank DayCards to beginning of dayCards list
  for (let blankDay = 1; blankDay <= selectedMonth.startsOn; blankDay++) {
    dayCards.unshift(<DayCard date={(prevMonthDays + 1 - blankDay).toString()} key={blankDay + selectedMonth.days} />);
  };

  const activeCrews: ICrew[] = useMemo(() => crews.filter(c => c.is_active), [crews]);

  const jobsToShow: IJobLocal[] = useMemo(() => jobs ? jobs.filter((job: IJobLocal) => isSameDay(new Date(job.date), new Date(`${selectedMonth.name} ${showDayDetails.day.date}, ${selectedMonth.year}`))) : [], [showDayDetails, jobs, selectedMonth]);

  const selectedDayJobs: ReactElement[] = jobsToShow.map((job, idx) => {
    return (<JobCard markJobComplete={markJobComplete} key={idx} job={job} crews={activeCrews} assignJobToCrew={assignJobToCrew} hideDate={true}/>);
  });


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

      <Modal show={showDayDetails.day.jobs.length > 0 && showDayDetails.show} fullscreen={true} onHide={() => setShowDayDetails({show: false, day: {date: 0, jobs: []}})}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedMonth.name} {showDayDetails.day.date}, {selectedMonth.year}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{selectedDayJobs}</Modal.Body>
      </Modal>

    </div>
  );
};

export default DispatchCalendar;

interface ISelectedDay {
  date: number;
  jobs: IJobLocal[] | [];
};
interface IShowDayDetails {
  show: boolean;
  day: ISelectedDay;
};

export interface DispatchCalendarProps {
  jobs: IJobLocal[];
  crews: ICrew[];
  assignJobToCrew: Function;
  markJobComplete: Function;
};