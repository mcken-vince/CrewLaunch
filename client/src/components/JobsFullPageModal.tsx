import Modal from 'react-bootstrap/Modal';
import '../styles/JobsFullPageModal.scss';
import { ICrew, IJobLocal } from '../definitions';
import JobCard from './JobCard';
import { ReactElement } from 'react';

const JobsFullPageModal = (props: JobsFullPageModalProps) => {
  const { jobs, date, show, onHide, markJobComplete, activeCrews, assignJobToCrew } = props;

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
        <Modal.Title>{date}</Modal.Title>
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