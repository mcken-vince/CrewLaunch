import '../styles/DayCard.scss';
import classNames from 'classnames';
import { DayCardProps} from './component-types';
import { FC, ReactElement } from 'react';


const DayCard: FC<DayCardProps> = (props): ReactElement => {
  const { date, jobs, selectDay } = props;


  const dayCardClass = classNames('daycard-container', {'daycard-container-empty': !jobs});
  const completeJobs = jobs && jobs.filter((job) => job.completed);
  
  return (
    <div key={date} className={dayCardClass} onClick={selectDay} >
      <h3>{date}</h3>
      <h3>{completeJobs && completeJobs.length}/{jobs && jobs.length}</h3>
      
    </div>
  );
};

export default DayCard;
