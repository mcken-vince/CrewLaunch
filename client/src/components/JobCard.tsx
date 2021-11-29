import ClassNames from 'classnames';
import { FC, ReactElement, useState } from 'react';
import '../styles/JobCard.scss';
import Button from 'react-bootstrap/Button';
import ConfirmAlert from './ConfirmAlert';
import { Card, Image, Spinner } from 'react-bootstrap';
import CrewSelector from './CrewSelector';
import { ICrew, IJobLocal } from '../definitions';
import { formatDate } from '../helpers/dataFormatters';
import { Check, X } from 'react-bootstrap-icons';

const JobCard: FC<JobCardProps> = (props): ReactElement => {
  const [confirm, setConfirm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { crews, assignJobToCrew, markJobComplete, job, hideDate } = props;
  const { address, date, completed, crew } = job;
  
  // const servicePackage = props.servicePackage;
  const handleCrewSelect = async (thisCrew: ICrew | {_id: undefined}) => {
    if (!assignJobToCrew) return;
    try {
      setLoading(true);
      await assignJobToCrew(thisCrew._id, props.job);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      setConfirm(false);
      const jobToMark = job;
      markJobComplete && await markJobComplete(jobToMark, !jobToMark.completed);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const toggleConfirm = () => {
    setConfirm(prev => !prev);
  };

  const jobCardClass: string = ClassNames('jobcard-container', {'jobcard-complete': completed, 'selected': confirm, 'hidden-date': hideDate, 'hidden-crew' : !assignJobToCrew});
  const formattedDate: string[] = formatDate(new Date(date)).split(' ');
  const completeButtonContent = completed ? <X/> : <Check/>;
  return (
    <Card className={jobCardClass}>
      <div className='jobcard-header'>
        {!hideDate && <h4 className='jobcard-date'><span>{formattedDate[0]},</span><span>{formattedDate.slice(1).join(' ')}</span></h4> }
        <h4>{address}</h4>
      </div>
      {assignJobToCrew && 
        <div className='jobcard-crew'>
          {crew ? 
            (<Image alt={crew.foreman_name} src={crew.avatar || 'https://www.pngfind.com/pngs/m/154-1540407_png-file-svg-silhouette-of-head-and-shoulders.png'} />) : 
            (<span className='crew-image' />)
          }
          <p>{crew ? crew.foreman_name : 'No crew assigned'}</p>
          {crews && !completed && <CrewSelector disabled={completed} crews={crews || []} onSelect={handleCrewSelect} selectedCrew={crew ? crew : null}/>}
        </div>}
      <Button disabled={confirm || !crew}
        className='jobcard-complete-button' 
        onClick={toggleConfirm}
      > 
        {loading ? <Spinner animation='border'/> : completeButtonContent}
          
      </Button>
      <ConfirmAlert variant={completed ? 'DELETE' : 'NONE'} show={confirm} message={completed ? 'Mark this job as incomplete?' : 'Mark this job as complete?'} onConfirm={handleConfirm} onCancel={toggleConfirm}/>
    </Card>
  );
};

export default JobCard;

export interface JobCardProps {
  job: IJobLocal;
  crews?: ICrew[];
  assignJobToCrew?: Function;
  markJobComplete: Function;
  hideDate?: boolean;
};