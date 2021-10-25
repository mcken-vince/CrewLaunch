import ClassNames from 'classnames';
import { FunctionComponent, ReactElement } from 'react';
import '../styles/JobCard.scss';
import { JobCardProps } from './component-types';

const JobCard: FunctionComponent<JobCardProps> = (props): ReactElement => {
  const { address, date, completed } = props;
  
  const jobCardClass: string = ClassNames('jobcard-container', {'jobcard-complete': completed})
  return (
    <div className={jobCardClass}>
      <h3>{address}</h3>
      <h3>{date}</h3>
      {completed ? <h4>Job completed</h4> : <button>Mark Complete</button>}
    </div>
  );
};

export default JobCard;