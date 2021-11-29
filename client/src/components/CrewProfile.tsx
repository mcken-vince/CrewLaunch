import { ICrew } from "../definitions";
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { PencilSquare } from "react-bootstrap-icons";
import classNames from "classnames";
import { Link } from "react-router-dom";
import '../styles/CrewProfile.scss';

const CrewProfile = (props: CrewProfileProps) => {
  const crew = props.crew;
  const statusClasses = classNames('crew-status', crew && {'active-crew': crew.is_active, 'inactive-crew': !crew.is_active});

 return (
  <div className='crew-profile'>
    <div className='profile-header'>
      <h1 className='profile-welcome-message'>Welcome, {crew.foreman_name}.</h1>
    </div>
    <div className='profile-body'>
      <div className='profile-details'>
        <Image className='profile-avatar' alt='avatar' src={crew.avatar || 'https://www.pngfind.com/pngs/m/154-1540407_png-file-svg-silhouette-of-head-and-shoulders.png'} />
        <div>
          <h4>Your crew size: {crew.crew_size}</h4>
          <h4>Status: <span className={statusClasses}>{crew.is_active ? 'Active' : 'Inactive'}</span></h4>
        </div>
      </div>
    </div>
    <div className='profile-footer'>
      <Button className='edit-profile-button'><Link to={`/crews/${crew._id}/edit`}><PencilSquare /> Edit</Link></Button>
    </div>
  </div>
 );
};

export default CrewProfile;

export interface CrewProfileProps {
  crew: ICrew;
};