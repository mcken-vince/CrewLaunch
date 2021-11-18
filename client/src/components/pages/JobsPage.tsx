import JobCard from "../JobCard";
import '../../styles/JobsPage.scss';
import { IJobLocal } from "../component-types";
import { IAlert, ICrew } from "../../definitions";

import { useState } from "react";
import { Alert } from "react-bootstrap";
import classNames from "classnames";

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

  const filteredJobs = [...jobs].sort((a, b) => {
    return a.date > b.date ? 1 : -1;
  });

  const jobCards = filteredJobs.map((j, idx) => {
    return (<JobCard assignJobToCrew={assignJobToCrew} markJobComplete={handleMarkComplete} key={idx} job={j} crews={crews}/>);
  });
  const alertVariant = classNames({'success': alert.type, 'danger': !alert.type});

  return (
    <div className='jobs-container'>
      <h1>Jobs: {jobs && jobs.length}</h1>
      <Alert dismissible show={alert.show} variant={alertVariant} onClose={() => setAlert({show: false, type: true, message: ''})}>
        <Alert.Heading>{alert.message}</Alert.Heading>
      </Alert>
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
  markJobComplete: Function;
};