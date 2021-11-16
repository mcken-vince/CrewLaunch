import JobCard from "../JobCard";
import '../../styles/JobsPage.scss';
import { IJobLocal } from "../component-types";

const JobsPage = (props: JobsPageProps) => {
  const { jobs } = props;

  const jobCards = jobs.map((j, idx) => {
    return (<JobCard key={idx} job={j}/>);
  });

  return (
    <div className='jobs-container'>
      <h1>Jobs: {jobs && jobs.length}</h1>
      <div className='jobs-grid'>
        {jobCards}
      </div>
    </div>
  );
};

export default JobsPage;

export interface JobsPageProps {
  jobs: IJobLocal[];
};