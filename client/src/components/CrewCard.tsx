import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import '../styles/CrewCard.scss';
import format from 'date-fns/format';
import classNames from 'classnames';
import { CrewCardProps, IJobLocal } from './component-types';
import { FC, ReactElement, useState } from 'react';
import ConfirmAlert from './ConfirmAlert';


const CrewCard: FC<CrewCardProps> = (props): ReactElement => {
  const { foreman_name, crew_size, avatar } = props.crew;
  const clearConfirm: IConfirm = {show: false, message: ''};
  const [confirm, setConfirm] = useState<IConfirm>(clearConfirm);
  const jobsOrderedByDate: IJobLocal[]  = props.jobs.sort((a, b) => parseInt(a.date.toString()) - parseInt(b.date.toString()));
  
  const jobs: ReactElement[] = jobsOrderedByDate.map(job => {
    const jobClass: string = classNames('crewCard-job', {'crewCard-job-completed': job.completed});
    return (<h5 className={jobClass}>{job.address} - {format(job.date, 'eeee MMMM dd yyyy')}</h5>);
  });
  
  return (
    <div className='crewCard-container' >
      <div className='crewCard-body'>
        <Image className='crewCard-avatar' src={avatar && avatar} alt='crew avatar' roundedCircle />
        <div className='crewCard-info'>
          <h3>{foreman_name}</h3>
          <p>{crew_size} workers</p>
        </div>
        <div className='crewCard-jobs-container'>
          {jobs}
        </div>
      </div>
      <footer className='crewCard-footer'>
        <Button className='edit-button' onClick={() => {setConfirm({show: true, message: 'Are you sure you want to edit this crew?'})}}>Edit</Button>
        <Button className='delete-button' variant='danger' onClick={() => {setConfirm({show: true, message: 'Are you sure you want to delete this crew?'})}}>Delete</Button>
      </footer>
      {<ConfirmAlert show={confirm.show} onCancel={() => {alert('Canceled!'); setConfirm(clearConfirm)}} onConfirm={() => {alert('Confirmed!'); setConfirm(clearConfirm)}} message={confirm.message}/>}
    </div>
  );
};

export default CrewCard;

interface IConfirm {
  show: boolean;
  message: String;
};