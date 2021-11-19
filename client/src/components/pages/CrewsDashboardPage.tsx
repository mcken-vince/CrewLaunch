import { MouseEventHandler, useEffect, useState } from 'react';
import { ICrew, IUser } from '../../definitions';
import useAppData from '../../hooks/useAppData';
import '../../styles/CrewsDashboardPage.scss';
import CrewsNav from '../CrewsNav';
import { Link, useParams } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import classNames from 'classnames';

const CrewsDashboardPage = (props: CrewsDashboardPageProps) => {
  const params: {id: string | undefined} = useParams();
  const crewId = params.id;
  const {state, updateState} = useAppData();
  const [crew, setCrew] = useState<ICrew | null>(null);
  const { onLogout, user } = props;

  useEffect(() => {
    const findCrew = state && state.crews.filter(c => c._id.toString() === crewId)[0];
    setCrew(findCrew);
  }, [state, crewId]);
  
  const statusClasses = classNames('crew-status', crew && {'active-crew': crew.is_active, 'inactive-crew': !crew.is_active});

  return (<>
    <CrewsNav onLogout={onLogout} user={user}/>
    {crew && 
      <div className='crews-dashboard-container'>
        <h1>Welcome, {crew.foreman_name}.</h1>
        <div className='profile'>
          <div className='profile-details'>
            <Image alt='avatar' src={crew.avatar || 'https://www.pngfind.com/pngs/m/154-1540407_png-file-svg-silhouette-of-head-and-shoulders.png'} />
            <h4>Your crew size: {crew.crew_size}</h4>
            <h4>Status: <span className={statusClasses}>{crew.is_active ? 'Active' : 'Inactive'}</span></h4>
          </div>
        <Button className='edit-profile-button'><Link to={`/crews/${crewId}/edit`}>Edit Profile</Link></Button>
        </div>
      </div>
    }
  </>);
};

export default CrewsDashboardPage;

export interface CrewsDashboardPageProps {
  onLogout: MouseEventHandler<HTMLButtonElement>;
  user: IUser;
};