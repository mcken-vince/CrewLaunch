import { FC, ReactElement } from 'react';
import { IState } from '../../definitions';
import '../../styles/DispatchDashboardPage.scss';
import DispatchCalendar from '../DispatchCalendar';
import DispatchNav from '../DispatchNav';
import { getJobsWithDetails } from '../../helpers/dataCombiners';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const DispatchDashboardPage: FC<any> = (props): ReactElement => {
  const state: IState = props.state;

  const detailedJobs = state.jobs ? getJobsWithDetails(state.jobs, state.contracts, state.packages) : [];
  return (
    <>
      <DispatchNav user={{name: 'Testy Tester', email: 'testy.testerforce@mail.com', password: 'secretpassword' }}/>
      <div className='dispatch-dashboard-container'> 
        <Router>
          <Switch>
            <Route path='/dispatch/crews/new'>
              <h1>New Crew Form</h1>
            </Route>
            <Route path='/dispatch/packages/new'>
              <h1>New Package Form</h1>
            </Route>
            <Route path='/dispatch/'>
              <DispatchCalendar jobs={detailedJobs}/>
            </Route>
            

          </Switch>
        </Router>
      </div>
    </>
  );
};

export default DispatchDashboardPage;