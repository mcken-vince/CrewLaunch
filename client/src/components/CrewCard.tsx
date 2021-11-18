import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import '../styles/CrewCard.scss';
import format from 'date-fns/format';
import classNames from 'classnames';
import { IJobLocal } from './component-types';
import { FC, ReactElement, useMemo, useState } from 'react';
import ConfirmAlert from './ConfirmAlert';
import { ICrew, IConfirm } from '../definitions';
import Card from 'react-bootstrap/Card';


const CrewCard: FC<CrewCardProps> = (props): ReactElement => {
  const { foreman_name, crew_size, avatar, is_active } = props.crew;
  const onDelete = props.onDelete;
  const clearConfirm: IConfirm = {show: false, message: '', action: 'NONE'};
  const [confirm, setConfirm] = useState<IConfirm>(clearConfirm);
  const jobsOrderedByDate: IJobLocal[]  = useMemo(() => props.jobs.sort((a, b) => parseInt(a.date.toString()) - parseInt(b.date.toString())), [props.jobs]);
  
  const handleConfirm = () => {
    if (confirm.action === 'DELETE') {
      const id = props.crew._id;
      onDelete(id);
    }
    if (confirm.action === 'EDIT') {


    }
    setConfirm(clearConfirm);
  };

  const handleCancel = () => {
    setConfirm(clearConfirm);
  };


  const jobs: ReactElement<any>[] = useMemo(() => jobsOrderedByDate.map(job => {
    const jobClass: string = classNames('crewCard-job', {'crewCard-job-completed': job.completed});
    return (<h5 className={jobClass}>{job.address} - {format(job.date, 'eeee MMMM dd yyyy')}</h5>);
  }), [jobsOrderedByDate]);
  
  const statusClasses: string = classNames('crewCard-status', {'active-crew': is_active, 'inactive-crew': !is_active});

  return (
    <Card className='crewCard-container'>
        <Card.Body className='crewCard-body'>
          <Image className='crewCard-avatar' src={avatar ? avatar : 'https://www.pngfind.com/pngs/m/154-1540407_png-file-svg-silhouette-of-head-and-shoulders.png'} alt='foreman avatar' roundedCircle />
          <div className='crewCard-info'>
            <h3>{foreman_name}</h3>
            <p>Status:
              <span className={statusClasses}>
              {is_active ? 'Active' : 'Inactive'}
              </span>
          
            </p>
            <p>{crew_size} workers</p>
          </div>
          <div className='crewCard-jobs-container'>
            {jobs}
          </div>
        </Card.Body>
      {!confirm.show && <footer className='crewCard-footer'>
          <Button className='edit-button' onClick={() => {setConfirm({show: true, message: 'Are you sure you want to edit this crew?', action: 'EDIT'})}}>Edit</Button>
          <Button className='delete-button' variant='danger' onClick={() => {setConfirm({show: true, message: 'Are you sure you want to delete this crew?', action: 'DELETE'})}}>Delete</Button>
      </footer>}
      <ConfirmAlert variant={confirm.action} show={confirm.show} onCancel={handleCancel} onConfirm={handleConfirm} message={confirm.message}/>
    </Card>
  );
};

export default CrewCard;

export interface CrewCardProps {
  crew: ICrew;
  jobs: IJobLocal[];
  onDelete: Function;
};