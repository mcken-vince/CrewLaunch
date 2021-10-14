import ClassNames from 'classnames';
import '../styles/JobCard.scss';

const JobCard = (props) => {
  const { address, date, complete } = props;
  
  const jobCardClass = ClassNames('jobcard-container', {'jobcard-complete': complete})
  return (
    <div className={jobCardClass}>
      <h3>{address}</h3>
      <h3>{date}</h3>
      {complete ? <h4>Job completed</h4> : <button>Mark Complete</button>}
    </div>
  );
};

export default JobCard;