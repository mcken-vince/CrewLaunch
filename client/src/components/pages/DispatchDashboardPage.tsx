import { MouseEventHandler } from 'react';
import { IContract, IPackage, IUser } from '../../definitions';
import '../../styles/DispatchDashboardPage.scss';
import DispatchCalendar from '../DispatchCalendar';
import ContractForm from '../forms/ContractForm';
import PackageForm from '../forms/PackageForm';
import ContractsPage from './ContractsPage';
import PackagesPage from './PackagesPage';
import { getJobsWithDetails, getContractsWithDetails } from '../../helpers/dataCombiners';
import { Switch, Route } from 'react-router-dom';
import CrewsPage from './CrewsPage';
import CrewForm from '../forms/CrewForm';
import { handlePackageCreation, handlePackageDeletion } from '../../helpers/packageHandlers';
import useAppData from '../../hooks/useAppData';
import { handleContractCreation } from '../../helpers/contractHandlers';

const DispatchDashboardPage = (props: DispatchDashboardPageProps) => {
  const {state, updateState} = useAppData();
  // const { user, onLogout } = props;

  const handleSubmit = (resource: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
      resolve(resource)}, 500);
    });
  };


  const detailedJobs = state ? getJobsWithDetails(state.jobs, state.contracts, state.packages) : [];
  const detailedContracts = state ? getContractsWithDetails(state.contracts, state.packages, state.clients) : [];

  return (
      <div className='dispatch-dashboard-container'> 

          <Switch>
            <Route path={`/dispatch/crews/new`}>
              <CrewForm onSubmit={handleSubmit} editCrew={null}/>
            </Route>
            <Route path={`/dispatch/packages/new`}>
              <PackageForm onSubmit={(pkg: IPackage) => {state && handlePackageCreation(pkg, state, updateState)}} editPackage={null}/>
            </Route>
            <Route path={`/dispatch/contracts/new`}>
              <ContractForm packages={state ? state.packages : []} onSubmit={(con: IContract) => {state && handleContractCreation(con, state, updateState)}} editContract={null}/>
            </Route>
            <Route path={`/dispatch/crews`}>
              <CrewsPage crews={state ? state.crews : []}/>
            </Route>
            <Route path={`/dispatch/packages`}>
              <PackagesPage packages={state ? state.packages : []} onDelete={(id: string) => {state && handlePackageDeletion(id, state, updateState)}}/>
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
  );
};

export default DispatchDashboardPage;

export interface DispatchDashboardPageProps {
  user: IUser;
  onLogout: MouseEventHandler<HTMLButtonElement>;
}