import ClassNames from 'classnames';
import { FC, ReactElement } from 'react';
import '../styles/JobCard.scss';
import { JobCardProps } from './component-types';
import format from 'date-fns/format';

const JobCard: FC<JobCardProps> = (props): ReactElement => {
  const { address, date, completed } = props;
  const servicePackage = props.servicePackage;

  const jobCardClass: string = ClassNames('jobcard-container', {'jobcard-complete': completed})
  return (
    <div className={jobCardClass}>
      <h4>{address}</h4>
      <h4>{format(new Date(date), 'MMMM dd, yyyy')}</h4>
      {completed ? <p>Job completed</p> : <button>Mark Complete</button>}
    </div>
  );
};

export default JobCard;