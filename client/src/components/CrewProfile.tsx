import { ICrew } from "../definitions";
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { PencilSquare, BackspaceReverse  } from "react-bootstrap-icons";
import classNames from "classnames";
import '../styles/CrewProfile.scss';
import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";


const CrewProfile = (props: CrewProfileProps) => {
  const [edit, setEdit] = useState<boolean>(false);
  const { crew, editCrew } = props;
  const [crewDetails, setCrewDetails] = useState<ICrew>(crew);
  const statusClasses = classNames('crew-status', crew && {'active-crew': crew.is_active, 'inactive-crew': !crew.is_active});

  const saveChanges = async () => {
    await editCrew(crewDetails);
  };

  const clickEdit = async () => {
    if (edit) {
      await saveChanges();
      setEdit(false);
    } else {
      setEdit(true);
    }
  };

  return (
    <div className='crew-profile'>
      {!edit ? <>
      <div className='profile-header'>
        <h1 className='profile-welcome-message'>Welcome, {crewDetails.foreman_name}.</h1>
      </div>
      <div className='profile-body'>
        <div className='profile-details'>
          <Image className='profile-avatar' alt='avatar' src={crewDetails.avatar || 'https://www.pngfind.com/pngs/m/154-1540407_png-file-svg-silhouette-of-head-and-shoulders.png'} />
          <div>
            <h4>Your crew size: {crewDetails.crew_size}</h4>
            <h4>Status: <span className={statusClasses}>{crewDetails.is_active ? 'Active' : 'Inactive'}</span></h4>
          </div>
        </div>
      </div>
      </> :
      <>
        <Form.Group>
          <Form.Label>Foreman Name:</Form.Label>
          <Form.Control 
            type='text' 
            value={crewDetails.foreman_name} 
            onChange={(e) => setCrewDetails(prev => ({...prev, foreman_name: e.target.value}))}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='crewEditCrewSize'>
          <Form.Label>Crew Size:</Form.Label>
          <Form.Select defaultValue={crewDetails.crew_size} aria-label='crewsize' onChange={(e) => setCrewDetails(prev => ({...prev, crew_size: parseInt(e.target.value)}))}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Active Status:</Form.Label>
          <InputGroup className='mb-3'>
            <Form.Check type="checkbox" checked={crewDetails.is_active} onChange={(e) => setCrewDetails(prev => ({...prev, is_active: !prev.is_active}))}  />
            <Form.Label>{crewDetails.is_active ? 'Active' : 'Inactive'}</Form.Label>
          </InputGroup>
        </Form.Group>

      </>
      }
      <div className='profile-footer'>
        <Button className='edit-profile-button' onClick={clickEdit}><PencilSquare /> {edit ? 'Save' : 'Edit'}</Button>
        {edit && <Button className='edit-profile-button' onClick={() => setEdit(false)}><BackspaceReverse/> Cancel</Button>}
      </div>
    </div>
  );
};

export default CrewProfile;

export interface CrewProfileProps {
  crew: ICrew;
  editCrew: Function;
};