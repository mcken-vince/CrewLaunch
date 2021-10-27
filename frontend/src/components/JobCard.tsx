import ClassNames from 'classnames';
import { FC, ReactElement } from 'react';
import '../styles/JobCard.scss';
import { JobCardProps } from './component-types';
import format from 'date-fns/format';

const JobCard: FC<JobCardProps> = (props): ReactElement => {
  const { address, date, completed, contract_id, crew_id, jobNotes, servicePackage } = props;
  console.log('address in jobCard: ', address);
  console.log('date in jobCard: ', date);
  console.log('completed in jobCard: ', completed);
  const jobCardClass: string = ClassNames('jobcard-container', {'jobcard-complete': completed})
  return (
    <div className={jobCardClass}>
      <h3>{address}</h3>
      <h3>{format(new Date(date), 'MMMM dd, yyyy')}</h3>
      {completed ? <h4>Job completed</h4> : <button>Mark Complete</button>}
    </div>
  );
};

export default JobCard;