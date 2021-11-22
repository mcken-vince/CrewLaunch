import { IJobLocal } from "../component-types";
import JobCard from "../JobCard";

const CrewJobsPage = (props: CrewJobsPageProps) => {
  const { jobs, assignJobtoCrew, markJobComplete } = props;

  const jobCards = jobs.map((j, idx) => {
    return (
      <JobCard key={idx} job={j} assignJobToCrew={assignJobtoCrew} markJobComplete={markJobComplete}/>
    );
  });

  return (
    <div className='crew-jobspage-container'>
      <h1>My Jobs: {jobs.length}</h1>
      {jobCards}
    </div>
  );
};

export default CrewJobsPage;

export interface CrewJobsPageProps {
  jobs: IJobLocal[];
  assignJobtoCrew: Function;
  markJobComplete: Function;
};