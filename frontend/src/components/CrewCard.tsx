import Image from 'react-bootstrap/Image';
import '../styles/CrewCard.scss';
import format from 'date-fns/format';
import classNames from 'classnames';
import { CrewCardProps } from './component-types';
import { ReactElement } from 'react';

const CrewCard = (props: CrewCardProps): ReactElement => {
  const { foreman_name, crew_size, avatar } = props.crew;

  const jobsOrderedByDate = props.jobs.sort((a, b) => parseInt(a.date.toString()) - parseInt(b.date.toString());
  
  const jobs = jobsOrderedByDate.map(job => {
    const jobClass = classNames('crewCard-job', {'crewCard-job-complete': job.completed});
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