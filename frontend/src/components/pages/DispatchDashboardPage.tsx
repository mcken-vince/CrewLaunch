import { FC, ReactElement } from 'react';
import { IState } from '../../definitions';
import '../../styles/DispatchDashboardPage.scss';
import DispatchCalendar from '../DispatchCalendar';
import DispatchNav from '../DispatchNav';
import { getJobsWithDetails } from '../../helpers/dataCombiners';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const DispatchDashboardPage: FC<any> = (props): ReactElement => {
  const { url } = useRouteMatch();
  const state: IState = props.state;

  const detailedJobs = state.jobs ? getJobsWithDetails(state.jobs, state.contracts, state.packages) : [];
  return (
    <>
      <DispatchNav user={{name: 'Testy Tester', email: 'testy.testerforce@mail.com', password: 'secretpassword' }}/>
      <div className='dispatch-dashboard-container'> 

          <Switch>
            <Route path={`${url}/crews/new`}>
              <h1>New Crew Form</h1>
            </Route>
            <Route path={`${url}/packages/new`}>
              <h1>New Package Form</h1>
            </Route>


            <Route path={`${url}`}>
              <DispatchCalendar jobs={detailedJobs}/>
            </Route>
          </Switch>

      </div>
    </>
  );
};

export default DispatchDashboardPage;