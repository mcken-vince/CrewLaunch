import { IJobLocal } from "../../definitions";
import JobCard from "../JobCard";
import '../../styles/CrewJobsPage.scss';
import CustomSearchBar from "../CustomSearchBar";
import { useState } from "react";

const CrewJobsPage = (props: CrewJobsPageProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { jobs, markJobComplete } = props;


  const lcSearchTerm = searchTerm.toLowerCase();
  const filteredJobs = jobs.filter(j => {
    return ( 
      j.address && j.address.toLowerCase().includes(lcSearchTerm)
    );
  });

  const sortedJobs: IJobLocal[] = [...filteredJobs].sort((a, b) => {
    return a.date > b.date ? 1 : -1;
  });

  const jobCards = sortedJobs.length > 0 ? sortedJobs.map((j, idx) => {
    return (
      <JobCard key={idx} job={j} markJobComplete={markJobComplete}/>
    );
  }) : <h2>No matching jobs found.</h2>;

  return (
    <div className='crew-jobspage-container'>
      <h1>My Jobs: {filteredJobs.length}/{jobs.length}</h1>
      <CustomSearchBar value={searchTerm} onChange={setSearchTerm} placeholder='Search by address'/>
      {jobCards}
    </div>
  );
};

export default CrewJobsPage;

export interface CrewJobsPageProps {
  jobs: IJobLocal[];
  markJobComplete: Function;
};