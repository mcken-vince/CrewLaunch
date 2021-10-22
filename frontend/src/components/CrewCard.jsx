import Image from 'react-bootstrap/Image';
import '../styles/CrewCard.scss';
import format from 'date-fns/format';
import classNames from 'classnames';

const CrewCard = (props) => {
  const { foreman_name, crew_size, avatar } = props.crew;

  const jobsOrderedByDate = props.jobs.sort((a, b) => a.date - b.date);
  
  const jobs = jobsOrderedByDate.map(job => {
    const jobClass = classNames('crewCard-job', {'crewCard-job-complete': job.complete});
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