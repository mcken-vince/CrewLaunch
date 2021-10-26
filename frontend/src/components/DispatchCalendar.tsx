import DayCard from './DayCard';
import '../styles/DispatchCalendar.scss';
import { getDaysInMonth, format, isEqual } from 'date-fns';
import { IthisMonth, IJobLocal } from './component-types';
import { useState, FC, ReactElement } from 'react';
import Modal from 'react-bootstrap/Modal';
import JobCard from './JobCard';

const DispatchCalendar: FC<any> = (props): ReactElement => {
  const { jobs } = props;
  const [showDayDetails, setShowDayDetails] = useState({show: false, day: {date: 0, jobs: [{}]}});


  // Opens a canvas of this day's jobs with details
  const selectDay = (date: number, jobs: IJobLocal[]): void => {
    setShowDayDetails({show: true, day: {date: date, jobs: jobs}});
  };

  const selectedDayJobs: ReactElement[] = showDayDetails.day.jobs && showDayDetails.day.jobs.map((job) => {
    return <JobCard {...job}/>
  });

  const today: Date = new Date();
  const thisMonth: IthisMonth = {
    name: format(today, 'MMMM'),
    year: format(today, 'yyyy'),
    days: getDaysInMonth(today)
  };

  const week: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysOfWeek: ReactElement[] = week.map(wd => <div className='weekday-container'><h3>{wd}</h3></div>);

  const dayCards: ReactElement[] = [];
  for (let d = 1; d <= thisMonth.days; d++) {
    const dayOfMonth: string = (0 < d && d < 10) ? `0${d}` : `${d}`;
    const todayJobs: IJobLocal[] = jobs ? jobs.filter((job: IJobLocal) => isEqual(new Date(job.date), new Date(`${thisMonth.name} ${d}, ${thisMonth.year}`))) : [];
    dayCards.push(<DayCard date={dayOfMonth} key={d} jobs={todayJobs} selectDay={():void => selectDay(d, todayJobs)} />);
  }

  return (
    <div className='dispatch-calendar-container'>
      <h1>{`${thisMonth.name} ${thisMonth.year}`}</h1>
      <div className='dispatch-calendar-days-container'>
        {daysOfWeek}
        {dayCards}
      </div>

      <Modal show={showDayDetails.show} fullscreen={true} onHide={() => setShowDayDetails({show: false, day: {date: 0, jobs: []}})}>
        <Modal.Header closeButton>
          <Modal.Title>{thisMonth.name} {showDayDetails.day}, {thisMonth.year}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{selectedDayJobs}</Modal.Body>
      </Modal>

    </div>
  );
};

export default DispatchCalendar