import '../styles/DayCard.scss';
import classNames from 'classnames';
import { DayCardProps} from './component-types';
import { FC, ReactElement } from 'react';


const DayCard: FC<DayCardProps> = (props): ReactElement => {
  const { date, jobs, selectDay } = props;


  const dayCardClass = classNames('daycard-container', {'daycard-container-empty': !jobs || jobs.length <= 0});
  const completeJobs = jobs && jobs.filter((job) => job.completed);
  
  return (
    <div key={date} className={dayCardClass} onClick={selectDay} >
      <h3 className='daycard-date'>{date}</h3>
      {jobs && completeJobs && <h3 className='daycard-jobcount'>{completeJobs.length}/{jobs.length}</h3>}
    </div>
  );
};

export default DayCard;
