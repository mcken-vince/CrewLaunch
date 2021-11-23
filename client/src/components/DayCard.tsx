import '../styles/DayCard.scss';
import classNames from 'classnames';
import { FC, ReactElement } from 'react';
import { IJobLocal } from '../definitions';


const DayCard: FC<DayCardProps> = (props): ReactElement => {
  const { date, jobs, selectDay, isToday } = props;

  const dayCardClass = classNames('daycard-container', {'daycard-container-empty': !jobs || jobs.length <= 0, today: isToday});
  const completeJobs = jobs && jobs.filter((job) => job.completed);
  
  return (
    <div key={date} className={dayCardClass} onClick={selectDay} >
      <h3 className='daycard-date'>{date}</h3>
      {jobs && completeJobs && <h3 className='daycard-jobcount'>{completeJobs.length}/{jobs.length}</h3>}
    </div>
  );
};

export default DayCard;

export interface DayCardProps {
  date?: string;
  jobs?: IJobLocal[];
  key: number;
  selectDay?: VoidFunction;
  isToday?: boolean;
};