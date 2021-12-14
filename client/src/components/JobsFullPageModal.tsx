import Modal from 'react-bootstrap/Modal';
import '../styles/JobsFullPageModal.scss';
import { ICrew, IJobLocal } from '../definitions';
import JobCard from './JobCard';
import { ReactElement } from 'react';

const JobsFullPageModal = (props: JobsFullPageModalProps) => {
  const { jobs, date, show, onHide, markJobComplete, activeCrews, assignJobToCrew } = props;

  let totalTimeEstimate: number = 0;
  jobs.forEach(job => {
    if (job.servicePackage) {
      if (job.crew) {
        totalTimeEstimate += (job.servicePackage.man_hrs_per_visit / job.crew.crew_size);
      } else {
        totalTimeEstimate += job.servicePackage.man_hrs_per_visit;
      }
    } 
  });
  const jobComponents: ReactElement[] = jobs.map((job, idx) => {
    return (<JobCard markJobComplete={markJobComplete} key={idx} job={job} crews={activeCrews && activeCrews} assignJobToCrew={assignJobToCrew} hideDate={true}/>);
  });

  return (
    <Modal 
      className='jobs-full-page-modal'
      show={jobs.length > 0 && show} 
      fullscreen={true} 
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>{date} - (Total: {totalTimeEstimate.toFixed(1)} hrs)</Modal.Title>
      </Modal.Header>
      <Modal.Body>{jobComponents}</Modal.Body>
    </Modal>
  );
};

export default JobsFullPageModal;

export interface JobsFullPageModalProps {
  jobs: IJobLocal[];
  show: boolean;
  onHide: VoidFunction;
  date: string;
  markJobComplete: Function;
  activeCrews?: ICrew[];
  assignJobToCrew?: Function;
};