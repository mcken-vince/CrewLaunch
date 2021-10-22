import '../styles/DayCard.scss';
import classNames from 'classnames';
import Button from 'react-bootstrap/Button';

const DayCard = (props) => {
  const { date, jobs, key } = props;

  const dayCardClass = classNames('daycard-container', {'daycard-container-empty': !jobs});
  const completeJobs = jobs && jobs.filter(job => job.complete);
  const jobList = jobs && jobs.map((job) => {
    const dayCardJobClass = classNames('daycard-job-li', {'daycard-job-li-complete': job.complete});
    return (
    <li className={dayCardJobClass}>
      {job.address}
    </li>);
  });

  const selectDay = () => {

  }

  return (
    <div key={key} className={dayCardClass} >
      <h3>{date}</h3>
      <h3>({jobs ? `${completeJobs.length}/${jobs.length}` : '0/0'})</h3>
      {/* {jobs && jobList.length > 0 ?
        (<ul>
         {jobList}
        </ul>) :
        <h4>No jobs booked</h4>} */}
        <Button disabled={!jobs || jobs.length <= 0} onClick={selectDay}>View Details</Button>
    </div>
  );
};

export default DayCard;
