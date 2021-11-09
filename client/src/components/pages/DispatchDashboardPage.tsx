import { FC, ReactElement } from 'react';
import { IState } from '../../definitions';
import '../../styles/DispatchDashboardPage.scss';
import DispatchCalendar from '../DispatchCalendar';
import DispatchNav from '../DispatchNav';
import ContractForm from '../forms/ContractForm';
import PackageForm from '../forms/PackageForm';
import ContractsPage from './ContractsPage';
import PackagesPage from './PackagesPage';
import { getJobsWithDetails, getContractsWithDetails } from '../../helpers/dataCombiners';
import { Switch, Route } from 'react-router-dom';
import CrewsPage from './CrewsPage';
import CrewForm from '../forms/CrewForm';

const DispatchDashboardPage: FC<any> = (props): ReactElement => {
  const state: IState = props.state;
  const updateState = props.updateState;

  const handleSubmit = (resource: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
      resolve(resource)}, 500);
    });
  };

  // test user, can be deleted when user validation is functional
  const testUser = {name: 'Testy Tester', email: 'testy.testerforce@mail.com', password: 'secretpassword' };
  const detailedJobs = state.jobs ? getJobsWithDetails(state.jobs, state.contracts, state.packages) : [];
  const detailedContracts = state.contracts ? getContractsWithDetails(state.contracts, state.packages, state.clients) : [];
  return (
    <>
      <DispatchNav />
      <div className='dispatch-dashboard-container'> 

          <Switch>
            <Route path={`/dispatch/crews/new`}>
              <CrewForm onSubmit={handleSubmit} editCrew={null}/>
            </Route>
            <Route path={`/dispatch/packages/new`}>
              <PackageForm onSubmit={handleSubmit} editPackage={null}/>
            </Route>
            <Route path={`/dispatch/contracts/new`}>
              <ContractForm packages={state.packages ? state.packages : []} onSubmit={handleSubmit} editContract={null}/>
            </Route>
            <Route path={`/dispatch/crews`}>
              <CrewsPage crews={state.crews ? state.crews : []}/>
            </Route>
            <Route path={`/dispatch/packages`}>
              <PackagesPage packages={state.packages ? state.packages : []}/>
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