import JobCard from "../JobCard";
import '../../styles/JobsPage.scss';
import { IJobLocal } from "../component-types";
import { ICrew } from "../../definitions";

const JobsPage = (props: JobsPageProps) => {
  const { jobs, crews, assignJobToCrew } = props;

  const filteredJobs = [...jobs].sort((a, b) => {
    return a.date > b.date ? 1 : -1;
  });

  const jobCards = filteredJobs.map((j, idx) => {
    return (<JobCard assignJobToCrew={assignJobToCrew} key={idx} job={j} crews={crews}/>);
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
  crews: ICrew[];
  assignJobToCrew: Function;
};