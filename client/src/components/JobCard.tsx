import ClassNames from 'classnames';
import { FC, ReactElement, useState } from 'react';
import '../styles/JobCard.scss';
import Button from 'react-bootstrap/Button';
import ConfirmAlert from './ConfirmAlert';
import { IJobLocal } from './component-types';
import { Card, Image, Spinner } from 'react-bootstrap';
import CrewSelector from './CrewSelector';
import { ICrew } from '../definitions';
import { formatDate } from '../helpers/dataFormatters';


const JobCard: FC<JobCardProps> = (props): ReactElement => {
  const [confirm, setConfirm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { crews, assignJobToCrew, markJobComplete, job } = props;
  const { address, date, completed, crew } = job;
  
  // const servicePackage = props.servicePackage;

  const handleCrewSelect = async (thisCrew: ICrew | {_id: undefined}) => {
    try {
      setLoading(true);
      await assignJobToCrew(thisCrew._id, props.job);
      setLoading(false);
    } catch (err) {
      throw err;
    }
  };

  const handleConfirm = async () => {
    setLoading(true);
    setConfirm(false);
    const jobToMark = job;
    markJobComplete && await markJobComplete(jobToMark);
    setLoading(false);
  };

  const toggleConfirm = () => {
    setConfirm(prev => !prev);
  };

  const jobCardClass: string = ClassNames('jobcard-container', {'jobcard-complete': completed, 'selected': confirm})
  const formattedDate: string[] = formatDate(new Date(date)).split(' ');
  const buttonText: string = completed ? 'Job Completed' : 'Mark Complete'
  return (
    <Card className={jobCardClass}>
      <h4>{address}</h4>
      <h4 className='jobcard-date'><span>{formattedDate[0]}</span><span>{formattedDate.slice(1).join(' ')}</span></h4> 
      <div className='jobcard-crew'>
        {crew ? 
          (<Image alt={crew.foreman_name} src={crew.avatar || 'https://www.pngfind.com/pngs/m/154-1540407_png-file-svg-silhouette-of-head-and-shoulders.png'} />) : 
          (<span className='crew-image' />)
        }
        <p>{crew ? crew.foreman_name : 'No crew assigned'}</p>
        <CrewSelector disabled={completed} crews={crews} onSelect={handleCrewSelect} selectedCrew={crew ? crew : null}/>
      </div>
        {markJobComplete && 
        <Button disabled={confirm || completed || !crew}
          className='jobcard-complete-button' 
          onClick={toggleConfirm}
        > 
          {loading ? <Spinner animation='border'/> : buttonText}
          
        </Button>}
        <ConfirmAlert show={confirm} message='Mark this job as complete?' onConfirm={handleConfirm} onCancel={toggleConfirm}/>
    </Card>
  );
};

export default JobCard;

export interface JobCardProps {
  job: IJobLocal;
  crews: ICrew[];
  assignJobToCrew: Function;
  markJobComplete?: Function;
};