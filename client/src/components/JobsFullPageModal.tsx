import Modal from 'react-bootstrap/Modal';
import { ReactElement } from "react";
import '../styles/JobsFullPageModal.scss';

const JobsFullPageModal = (props: JobsFullPageModalProps) => {
  const { jobComponents, date, show, onHide } = props;


  return (
    <Modal 
        className='jobs-full-page-modal'
        show={jobComponents.length > 0 && show} 
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
  jobComponents: ReactElement<any>[];
  show: boolean;
  onHide: VoidFunction;
  date: string;
};