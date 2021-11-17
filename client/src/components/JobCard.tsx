import ClassNames from 'classnames';
import { FC, ReactElement, useState } from 'react';
import '../styles/JobCard.scss';
import format from 'date-fns/format';
import Button from 'react-bootstrap/Button';
import ConfirmAlert from './ConfirmAlert';
import { IJobLocal } from './component-types';
import { Image } from 'react-bootstrap';

const JobCard: FC<JobCardProps> = (props): ReactElement => {
  const [confirm, setConfirm] = useState<boolean>(false);
  const { address, date, completed, crew } = props.job;
  // const servicePackage = props.servicePackage;

  const jobCardClass: string = ClassNames('jobcard-container container', {'jobcard-complete': completed, 'selected': confirm})

  const toggleConfirm = () => {
    setConfirm(prev => !prev);
  };

  return (
    <div className={jobCardClass}>
      <ConfirmAlert show={confirm} message='Mark this job as complete?' onConfirm={toggleConfirm} onCancel={toggleConfirm}/>
      <h4>{address}</h4>
      <h4>{format(new Date(date), 'MMMM dd, yyyy')}</h4> 
      <div className='jobcard-crew'>
        <Image alt={crew && crew.foreman_name} src={crew && (crew.avatar || 'https://www.pngfind.com/pngs/m/154-1540407_png-file-svg-silhouette-of-head-and-shoulders.png')} />
        <p>{crew ? crew.foreman_name : 'No crew assigned'}</p>
      </div>
        <Button disabled={confirm || completed}
          className='jobcard-complete-button' 
          onClick={toggleConfirm}
        > 
          {completed ? 'Job Completed' : 'Mark Complete'}
        </Button>
    </div>
  );
};

export default JobCard;

export interface JobCardProps {
  job: IJobLocal;
};