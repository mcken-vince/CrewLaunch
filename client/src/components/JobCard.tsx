import ClassNames from 'classnames';
import { FC, ReactElement, useState } from 'react';
import '../styles/JobCard.scss';
import { JobCardProps } from './component-types';
import format from 'date-fns/format';
import Button from 'react-bootstrap/Button';
import ConfirmAlert from './ConfirmAlert';

const JobCard: FC<JobCardProps> = (props): ReactElement => {
  const [confirm, setConfirm] = useState<boolean>(false);
  const { address, date, completed } = props;
  const servicePackage = props.servicePackage;

  const jobCardClass: string = ClassNames('jobcard-container', {'jobcard-complete': completed, 'selected': confirm})

  const toggleConfirm = () => {
    setConfirm(prev => !prev);
  };

  return (
    <div className={jobCardClass}>
      <ConfirmAlert show={confirm} message='Mark this job as complete?' onConfirm={toggleConfirm} onCancel={toggleConfirm}/>
      <h4>{address}</h4>
      <h4>{format(new Date(date), 'MMMM dd, yyyy')}</h4>
      {completed ? <p>Job completed</p> : 
        <Button disabled={confirm}
          className='jobcard-complete-button' 
          onClick={toggleConfirm}
        > 
          Mark Complete
        </Button>}
    </div>
  );
};

export default JobCard;