import JobCard from "../JobCard";
import '../../styles/JobsPage.scss';
import { IAlert, ICrew, IJobLocal } from "../../definitions";
import { ChangeEvent, useMemo, useState } from "react";
import { Alert, Form } from "react-bootstrap";
import classNames from "classnames";
import CustomSearchBar from "../CustomSearchBar";
import DropdownSortBy from "../DropdownSortBy";

const JobsPage = (props: JobsPageProps) => {
  const [checked, setChecked] = useState<string | null>('none');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [alert, setAlert] = useState<IAlert>({show: false, type: true, message: ''});
  const [sortBy, setSortBy] = useState<string>('Date');
  const { jobs, crews, assignJobToCrew, markJobComplete } = props;

  const handleMarkComplete = async (job: IJobLocal) => {
    try {
      await markJobComplete(job, !job.completed);
      setAlert({show: true, type: true, message: 'Job completed!'});
    } catch (err) {
      setAlert({show: true, type: false, message: `Internal Error: ${err}`});
      return 'Error marking job complete';
    }
  };
  // Radio 'Filter by:'
  let filterFn;
  switch(checked) {
    case 'completed':
      filterFn = ((j: IJobLocal) => j.completed);
      break;
    case 'uncompleted':
      filterFn = ((j: IJobLocal) => !j.completed);
      break;
    case 'assigned':
      filterFn = ((j: IJobLocal) => j.crew_id);
      break;
    case 'unassigned':
      filterFn = ((j: IJobLocal) => !j.crew_id);
      break;
    default:
      filterFn = null;
  };
  const prefilteredJobs: IJobLocal[] = filterFn ? jobs.filter(filterFn) : jobs;
    
  let sortFn;
  switch(sortBy) {
    case 'Date - reverse':
      sortFn = ((a: IJobLocal, b: IJobLocal) => a.date > b.date ? 1 : -1);
      break;
    case 'Address':
      sortFn = ((a: IJobLocal, b: IJobLocal) => a.address > b.address ? 1 : -1);
      break;
    default:
      sortFn = ((a: IJobLocal, b: IJobLocal) => a.date < b.date ? 1 : -1);
  };
  
  const sortedJobs: IJobLocal[] = [...prefilteredJobs].sort(sortFn);

  const lcSearchTerm: string = searchTerm.toLowerCase();
  const filteredJobs: IJobLocal[] = sortedJobs.filter(j => {
    return (
      (j.address && j.address.toLowerCase().includes(lcSearchTerm)) ||
      (j.crew && j.crew.foreman_name.toLowerCase().includes(lcSearchTerm))
    );
  });

  const alertVariant: string = classNames({'success': alert.type, 'danger': !alert.type});
  const unassignedJobs: IJobLocal[] = filteredJobs.filter(j => j.crew_id === undefined) ;
  const uncompletedJobs: IJobLocal[] = filteredJobs.filter(j => j.completed === false);
  const activeCrews: ICrew[] = useMemo(() => crews.filter(c => c.is_active), [crews]);
  
  const jobCards = filteredJobs.map((j, idx) => {
    return (<JobCard assignJobToCrew={assignJobToCrew} markJobComplete={handleMarkComplete} key={idx} job={j} crews={activeCrews}/>);
  });

  const dropdownSortItems = [
    {name: 'Date', onClick: (itemName: string) => (setSortBy(itemName))},
    {name: 'Date - reverse', onClick: (itemName: string) => (setSortBy(itemName))},
    {name: 'Address', onClick: (itemName: string) => (setSortBy(itemName))}
  ];

  return (
    <div className='jobs-container'>
      <div className='jobs-page-header'>
        <div>
          <h1>Jobs: {filteredJobs.length}/{jobs && jobs.length}</h1>
          <h3>Unassigned jobs: {unassignedJobs.length}</h3>
          <h3>Incomplete jobs: {uncompletedJobs.length}</h3>
          <DropdownSortBy items={dropdownSortItems}/>
        </div>
        <div className='radio-filters'>
          <h5>Show:</h5>
              <Form.Group >
                <Form.Check onChange={(e: ChangeEvent<HTMLInputElement>) => {setChecked(e.target.value)}} inline type='radio' label='All' name='jobFilter' id='none' value='none' checked={checked === 'none'} />
                <Form.Check onChange={(e: ChangeEvent<HTMLInputElement>) => {setChecked(e.target.value)}} inline type='radio' label='Completed jobs' name='jobFilter' id='completedJobs' value='completed' checked={checked === 'completed'}/>
                <Form.Check onChange={(e: ChangeEvent<HTMLInputElement>) => {setChecked(e.target.value)}} inline type='radio' label='Uncompleted jobs' name = 'jobFilter' id='uncompletedJobs' value='uncompleted' checked={checked === 'uncompleted'}/>
                <Form.Check onChange={(e: ChangeEvent<HTMLInputElement>) => {setChecked(e.target.value)}} inline type='radio' label='Unassigned jobs' name='jobFilter' id='unassignedJobs' value='unassigned'checked={checked === 'unassigned'}/>
                <Form.Check onChange={(e: ChangeEvent<HTMLInputElement>) => {setChecked(e.target.value)}} inline type='radio' label='Assigned jobs' name='jobFilter' id='assignedJobs' value='assigned' checked={checked === 'assigned'}/>
              </Form.Group>
        </div>
      </div>
      <Alert dismissible show={alert.show} variant={alertVariant} onClose={() => setAlert({show: false, type: true, message: ''})}>
        <Alert.Heading>{alert.message}</Alert.Heading>
      </Alert>
      <CustomSearchBar value={searchTerm} onChange={(val: string) => setSearchTerm(val)} placeholder='Search by address or foreman name'/>
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