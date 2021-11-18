import ClassNames from 'classnames';
import { FC, ReactElement, useState } from 'react';
import '../styles/JobCard.scss';
import Button from 'react-bootstrap/Button';
import ConfirmAlert from './ConfirmAlert';
import { IJobLocal } from './component-types';
import { Card, Image } from 'react-bootstrap';
import CrewSelector from './CrewSelector';
import { ICrew } from '../definitions';
import { formatDate } from '../helpers/dataFormatters';


const JobCard: FC<JobCardProps> = (props): ReactElement => {
  const [confirm, setConfirm] = useState<boolean>(false);
  const { address, date, completed, crew } = props.job;
  const [selectedCrew, setSelectedCrew] = useState<ICrew | null>(crew || null);
  const { crews, assignJobToCrew } = props;
  
  // const servicePackage = props.servicePackage;

  const handleCrewSelect = async (thisCrew: ICrew) => {
    assignJobToCrew(thisCrew._id, props.job)
    setSelectedCrew(thisCrew);
  };

  const toggleConfirm = () => {
    setConfirm(prev => !prev);
  };

  const jobCardClass: string = ClassNames('jobcard-container', {'jobcard-complete': completed, 'selected': confirm})
  const formattedDate = formatDate(new Date(date)).split(' ');
  return (
    <Card className={jobCardClass}>
      <h4>{address}</h4>
      <h4 className='jobcard-date'><span>{formattedDate[0]}</span><span>{formattedDate.slice(1).join(' ')}</span></h4> 
      <div className='jobcard-crew'>
        {selectedCrew ? 
          (<Image alt={selectedCrew.foreman_name} src={selectedCrew.avatar || 'https://www.pngfind.com/pngs/m/154-1540407_png-file-svg-silhouette-of-head-and-shoulders.png'} />) : 
          (<span className='crew-image' />)
        }
        <p>{selectedCrew ? selectedCrew.foreman_name : 'No crew assigned'}</p>
        <CrewSelector crews={crews} onSelect={handleCrewSelect} selectedCrew={selectedCrew}/>
      </div>
        <Button disabled={confirm || completed || !selectedCrew}
          className='jobcard-complete-button' 
          onClick={toggleConfirm}
        > 
          {completed ? 'Job Completed' : 'Mark Complete'}
        </Button>
        <ConfirmAlert show={confirm} message='Mark this job as complete?' onConfirm={toggleConfirm} onCancel={toggleConfirm}/>
    </Card>
  );
};

export default JobCard;

export interface JobCardProps {
  job: IJobLocal;
  crews: ICrew[];
  assignJobToCrew: Function;
};