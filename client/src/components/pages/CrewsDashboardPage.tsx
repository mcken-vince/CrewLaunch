import { MouseEventHandler, useEffect, useState } from 'react';
import { ICrew, IJob,  IUserLocal } from '../../definitions';
import useAppData from '../../hooks/useAppData';
import '../../styles/CrewsDashboardPage.scss';
import CrewsNav from '../CrewsNav';
import { Link, useParams, Route, Switch } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import classNames from 'classnames';
import EditProfileForm from '../forms/EditProfileForm';
import { getCrewJobsWithDetails } from '../../helpers/dataCombiners';
import { IJobLocal } from '../component-types';
import CrewJobsPage from './CrewJobsPage';
import { assignJobToCrew, markJobComplete } from '../../helpers/jobHandlers';
import {PencilSquare} from 'react-bootstrap-icons';

const CrewsDashboardPage = (props: CrewsDashboardPageProps) => {
  const params: {id: string | undefined} = useParams();
  const crewId = params && params.id;
  const {state, updateState} = useAppData();
  const [crew, setCrew] = useState<ICrew | null>(null);
  const { onLogout, user } = props;

  useEffect(() => {
    const findCrew = state && state.crews.filter(c => c._id.toString() === crewId)[0];
    setCrew(findCrew);
  }, [state, crewId]);


  const statusClasses = classNames('crew-status', crew && {'active-crew': crew.is_active, 'inactive-crew': !crew.is_active});

  const jobs: IJobLocal[] = (state && crewId) ? getCrewJobsWithDetails(crewId, state.crews, state.jobs, state.packages, state.contracts, state.clients) : [];

  return (<>
    <CrewsNav onLogout={onLogout} user={user} crew={crew}/>
    <div className='crews-dashboard-container'>
    {crew && <>
    <Switch>
      <Route path='/crews/:id/edit'>
        <EditProfileForm crew={crew}/>
      </Route>
      
      <Route path='/crews/:id/jobs'>
        <CrewJobsPage 
          jobs={jobs} 
          assignJobtoCrew={(crewId: string, job: IJob) => state && assignJobToCrew(crewId, job, state, updateState)} 
          markJobComplete={(job: IJob) => state && markJobComplete(job, state, updateState)}
        />
      </Route>
      
      <Route path='/crews/:id'>
      
        <div className='profile'>
          <div>
            <h1 className='profile-welcome-message'>Welcome, {crew.foreman_name}.</h1>
            <div className='profile-details'>
              <Image className='profile-avatar' alt='avatar' src={crew.avatar || 'https://www.pngfind.com/pngs/m/154-1540407_png-file-svg-silhouette-of-head-and-shoulders.png'} />
              <h4>Your crew size: {crew.crew_size}</h4>
              <h4>Status: <span className={statusClasses}>{crew.is_active ? 'Active' : 'Inactive'}</span></h4>
            </div>
          </div>
            <Button className='edit-profile-button'><Link to={`/crews/${crewId}/edit`}><PencilSquare /> Edit</Link></Button>
        </div>
      </Route>
      </Switch>
    </>}
    </div>
  </>);
};

export default CrewsDashboardPage;

export interface CrewsDashboardPageProps {
  onLogout: MouseEventHandler<HTMLButtonElement>;
  user: IUserLocal;
};