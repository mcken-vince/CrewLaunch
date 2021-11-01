import { FC, ReactElement } from 'react';
import { IState } from '../../definitions';
import '../../styles/DispatchDashboardPage.scss';
import DispatchCalendar from '../DispatchCalendar';
import DispatchNav from '../DispatchNav';
import ContractForm from '../ContractForm';
import PackageForm from '../PackageForm';
import { getJobsWithDetails } from '../../helpers/dataCombiners';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const DispatchDashboardPage: FC<any> = (props): ReactElement => {
  const { url } = useRouteMatch();
  const state: IState = props.state;
  const updateState = props.updateState;



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
              <PackageForm onSubmit={(newPackage) => Promise.resolve(newPackage)} editPackage={null}/>
            </Route>
            <Route path={`${url}/contracts/new`}>
              <ContractForm packages={state.packages ? state.packages : []} onSubmit={() => {console.log('contract submitted')}} editContract={null}/>
            </Route>
            <Route path={`${url}/crews`}>
              <h1>Crews Page</h1>
            </Route>
            <Route path={`${url}/packages`}>
              <h1>Packages Page</h1>
            </Route>
            <Route path={`${url}/contracts`}>
              <h1>Contracts Page</h1>
            </Route>
            <Route path={`${url}/clients`}>
              <h1>Clients Page</h1>
            </Route>
            <Route path={`${url}/jobs`}>
              <h1>Jobs Page</h1>
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