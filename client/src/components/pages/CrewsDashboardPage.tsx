import { MouseEventHandler, useEffect, useState } from 'react';
import { ICrew, IJob, IUserLocal, IJobLocal } from '../../definitions';
import useAppData from '../../hooks/useAppData';
import '../../styles/CrewsDashboardPage.scss';
import CrewsNav from '../CrewsNav';
import { useParams, Route, Switch } from 'react-router-dom';
import { getCrewJobsWithDetails } from '../../helpers/dataCombiners';
import CrewJobsPage from './CrewJobsPage';
import { markJobComplete } from '../../helpers/jobHandlers';
import ScrollTop from '../ScrollTop';
import CrewCalendar from '../CrewCalendar';
import CrewProfile from '../CrewProfile';
import { handleCrewEdit } from '../../helpers/crewHandlers';
import isToday from 'date-fns/isToday';

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


  const jobs: IJobLocal[] = (state && crewId) ? getCrewJobsWithDetails(crewId, state.crews, state.jobs, state.packages, state.contracts, state.clients) : [];
  const uncompletedOverdueJobs = jobs.filter(j => new Date(j.date) < new Date() && !j.completed);
  const todayJobs = jobs.filter(j => isToday(new Date(j.date)) && !j.completed);

  return (<>
    <CrewsNav onLogout={onLogout} user={user} crew={crew}/>
    <div className='crews-dashboard-container'>
    {crew && <>
    <Switch>
      
      <Route path='/crews/:id/jobs'>
        <CrewJobsPage 
          jobs={jobs} 
          markJobComplete={(job: IJob, complete: boolean) => state && markJobComplete(job, complete, state, updateState)}
        />
      </Route>
      
      <Route path='/crews/:id'>
        <>
          <CrewProfile 
            crew={crew} 
            editCrew={(id: string, crew: ICrew) => state && handleCrewEdit(id, crew, state, updateState)}
          />
          <div className='notifications'>
            {uncompletedOverdueJobs.length !== 0 && 
              <h3>{`You have ${uncompletedOverdueJobs.length} overdue job${uncompletedOverdueJobs.length === 1 ? '' : 's'}.`}</h3>
              
            }
            {todayJobs.length !==0 && 
              
              <h3>{`You have ${todayJobs.length} job${todayJobs.length === 1 ? '' : 's'} remaining today.`}</h3>
            }
          </div>
          <CrewCalendar
            jobs={jobs} 
            markJobComplete={(job: IJob, complete: boolean) => state && markJobComplete(job, complete, state, updateState)}
          />
        </>
      </Route>
      </Switch>
    </>}
    </div>
    <ScrollTop />
  </>);
};

export default CrewsDashboardPage;

export interface CrewsDashboardPageProps {
  onLogout: MouseEventHandler<HTMLButtonElement>;
  user: IUserLocal;
};