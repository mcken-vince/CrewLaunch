import { FC, ReactElement } from 'react';
import { IState } from '../../definitions';
import '../../styles/DispatchDashboardPage.scss';
import DispatchCalendar from '../DispatchCalendar';
import DispatchNav from '../DispatchNav';
import ContractForm from '../ContractForm';
import PackageForm from '../PackageForm';
import ContractsPage from './ContractsPage';
import { getJobsWithDetails, getContractsWithDetails } from '../../helpers/dataCombiners';
import { Switch, Route } from 'react-router-dom';

const DispatchDashboardPage: FC<any> = (props): ReactElement => {
  const state: IState = props.state;
  const updateState = props.updateState;



  const detailedJobs = state.jobs ? getJobsWithDetails(state.jobs, state.contracts, state.packages) : [];
  const detailedContracts = state.contracts ? getContractsWithDetails(state.contracts, state.packages, state.clients) : [];
  return (
    <>
      <DispatchNav user={{name: 'Testy Tester', email: 'testy.testerforce@mail.com', password: 'secretpassword' }}/>
      <div className='dispatch-dashboard-container'> 

          <Switch>
            <Route path={`/dispatch/crews/new`}>
              <h1>New Crew Form</h1>
            </Route>
            <Route path={`/dispatch/packages/new`}>
              <PackageForm onSubmit={(newPackage) => Promise.resolve(newPackage)} editPackage={null}/>
            </Route>
            <Route path={`/dispatch/contracts/new`}>
              <ContractForm packages={state.packages ? state.packages : []} onSubmit={() => {console.log('contract submitted')}} editContract={null}/>
            </Route>
            <Route path={`/dispatch/crews`}>
              <h1>Crews Page</h1>
            </Route>
            <Route path={`/dispatch/packages`}>
              <h1>Packages Page</h1>
            </Route>
            <Route path={`/dispatch/contracts`}>
              <ContractsPage contracts={detailedContracts}/>
            </Route>
            <Route path={`/dispatch/clients`}>
              <h1>Clients Page</h1>
            </Route>
            <Route path={`/dispatch/jobs`}>
              <h1>Jobs Page</h1>
            </Route>

            <Route path={`/dispatch`}>
              <DispatchCalendar jobs={detailedJobs}/>
            </Route>
          </Switch>

      </div>
    </>
  );
};

export default DispatchDashboardPage;