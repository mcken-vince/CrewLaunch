import '../styles/DayCard.scss';
import classNames from 'classnames';

const DayCard = (props) => {
  const { date, jobs } = props;

  const dayCardClass = classNames('daycard-container', {'daycard-container-empty': !jobs});
  const completeJobs = jobs && jobs.filter(job => job.complete);
  const jobList = jobs && jobs.map((job) => {
    const dayCardJobClass = classNames('daycard-job-li', {'daycard-job-li-complete': job.complete});
    return (
    <li className={dayCardJobClass}>
      {job.address}
    </li>);
  });

  return (
    <div className={dayCardClass}>
      <h3>{date} - ({jobs ? `${completeJobs.length}/${jobs.length}` : '0/0'})</h3>
      {jobs && jobList.length > 0 ?
        (<ul>
         {jobList}
        </ul>) :
        <h4>No jobs booked</h4>}
    </div>
  );
};

export default DayCard;
