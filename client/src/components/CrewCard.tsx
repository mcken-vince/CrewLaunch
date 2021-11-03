import Image from 'react-bootstrap/Image';
import '../styles/CrewCard.scss';
import format from 'date-fns/format';
import classNames from 'classnames';
import { CrewCardProps, IJobLocal } from './component-types';
import { FC, ReactElement } from 'react';

const CrewCard: FC<CrewCardProps> = (props): ReactElement => {
  const { foreman_name, crew_size, avatar } = props.crew;

  const jobsOrderedByDate: IJobLocal[]  = props.jobs.sort((a, b) => parseInt(a.date.toString()) - parseInt(b.date.toString()));
  
  const jobs: ReactElement[] = jobsOrderedByDate.map(job => {
    const jobClass: string = classNames('crewCard-job', {'crewCard-job-completed': job.completed});
    return (<h5 className={jobClass}>{job.address} - {format(job.date, 'eeee MMMM dd yyyy')}</h5>);
  });

  return (
    <div className='crewCard-container' >
      <Image className='crewCard-avatar' src={avatar && avatar} alt='crew avatar' roundedCircle />
      <div className='crewCard-info'>
        <h3>{foreman_name}</h3>
        <p>{crew_size} workers</p>
      </div>
      <div className='crewCard-jobs-container'>
        {jobs}
      </div>
    </div>
  )
};

export default CrewCard;