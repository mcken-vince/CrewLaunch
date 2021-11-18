import JobCard from "../JobCard";
import '../../styles/JobsPage.scss';
import { IJobLocal } from "../component-types";
import { IAlert, ICrew } from "../../definitions";

import { useState } from "react";
import { Alert } from "react-bootstrap";
import classNames from "classnames";
import CustomSearchBar from "../CustomSearchBar";

const JobsPage = (props: JobsPageProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [alert, setAlert] = useState<IAlert>({show: false, type: true, message: ''});
  const { jobs, crews, assignJobToCrew, markJobComplete } = props;


  const handleMarkComplete = async (job: IJobLocal) => {
    try {
      await markJobComplete(job);
      setAlert({show: true, type: true, message: 'Job completed!'});
    } catch (err) {
      setAlert({show: true, type: false, message: `Internal Error: ${err}`});
      return 'Error marking job complete';
    }
  };

  // Sort jobs in reverse chronological order
  const sortedJobs = [...jobs].sort((a, b) => {
    return a.date < b.date ? 1 : -1;
  });

  const lcSearchTerm = searchTerm.toLowerCase();
  const filteredJobs = sortedJobs.filter((j: IJobLocal) => {
    return (
      (j.address && j.address.toLowerCase().includes(lcSearchTerm)) ||
      (j.crew && j.crew.foreman_name.toLowerCase().includes(lcSearchTerm))
    );
  });

  const jobCards = filteredJobs.map((j, idx) => {
    return (<JobCard assignJobToCrew={assignJobToCrew} markJobComplete={handleMarkComplete} key={idx} job={j} crews={crews}/>);
  });
  const alertVariant = classNames({'success': alert.type, 'danger': !alert.type});
  const unassignedJobs: IJobLocal[] = jobs.filter(j => j.crew_id === undefined) ;
  const uncompletedJobs: IJobLocal[] = jobs.filter(j => j.completed === false)
  return (
    <div className='jobs-container'>
      <div className='jobs-page-header'>
        <h1>Jobs: {jobs && jobs.length}</h1>
        <h3>Unassigned jobs: {unassignedJobs.length}</h3>
        <h3>Incomplete jobs: {uncompletedJobs.length}</h3>
      </div>
      <Alert dismissible show={alert.show} variant={alertVariant} onClose={() => setAlert({show: false, type: true, message: ''})}>
        <Alert.Heading>{alert.message}</Alert.Heading>
      </Alert>
      <CustomSearchBar value={searchTerm} onChange={(val: string) => setSearchTerm(val)} placeholder='Search by address, or foreman name'/>
      <div className='jobs-grid'>
      {
        jobCards && jobCards.length > 0 ? 
        jobCards : <h2>No matching jobs found.</h2>
        }
      </div>
    </div>
  );
};

export default JobsPage;

export interface JobsPageProps {
  jobs: IJobLocal[];
  crews: ICrew[];
  assignJobToCrew: Function;
  markJobComplete: Function;
};