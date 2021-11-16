import '../../styles/DispatchDashboardPage.scss';
import { MouseEventHandler } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ICrew, IPackage, IUser } from '../../definitions';
import { IContractLocal } from '../component-types';
import DispatchCalendar from '../DispatchCalendar';
import ContractForm from '../forms/ContractForm';
import PackageForm from '../forms/PackageForm';
import ContractsPage from './ContractsPage';
import PackagesPage from './PackagesPage';
import CrewsPage from './CrewsPage';
import CrewForm from '../forms/CrewForm';
import { getJobsWithDetails, getContractsWithDetails, getClientsWithContracts } from '../../helpers/dataCombiners';
import { handlePackageCreation, handlePackageDeletion } from '../../helpers/packageHandlers';
import useAppData from '../../hooks/useAppData';
import { handleContractCreation } from '../../helpers/contractHandlers';
import { handleCrewCreation, handleCrewDeletion } from '../../helpers/crewHandlers';
import ClientsPage from './ClientsPage';

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
  const clientsWithContracts = state ? getClientsWithContracts(state.clients, state.contracts) : [];

  return (
      <div className='dispatch-dashboard-container'> 

          <Switch>
            <Route path={`/dispatch/crews/new`}>
              <CrewForm onSubmit={(crew: ICrew) => {state && handleCrewCreation(crew, state, updateState)}} editCrew={null}/>
            </Route>
            <Route path={`/dispatch/packages/new`}>
              <PackageForm onSubmit={(pkg: IPackage) => {state && handlePackageCreation(pkg, state, updateState)}} packages={state ? state.packages : []}/>
            </Route>
            <Route path={`/dispatch/contracts/new`}>
              <ContractForm packages={state ? state.packages : []} onSubmit={(con: IContractLocal) => {state && handleContractCreation(con, state, updateState)}} contracts={detailedContracts}/>
            </Route>
            <Route path={`/dispatch/contracts/edit/:id`}>
              <ContractForm contracts={detailedContracts} packages={state ? state.packages : []} onSubmit={handleSubmit} />
            </Route>
            <Route path={`/dispatch/packages/edit/:id`}>
              <PackageForm onSubmit={handleSubmit} packages={state ? state.packages : []}/>
            </Route>
            <Route path={`/dispatch/crews`}>
              <CrewsPage onDelete={(id: string) => {state && handleCrewDeletion(id, state, updateState)}} crews={state ? state.crews : []}/>
            </Route>
            <Route path={`/dispatch/packages`}>
              <PackagesPage packages={state ? state.packages : []} onDelete={(id: string) => {state && handlePackageDeletion(id, state, updateState)}}/>
            </Route>
            <Route path={`/dispatch/contracts`}>
              <ContractsPage contracts={detailedContracts}/>
            </Route>
            <Route path={`/dispatch/clients`}>
              <ClientsPage clients={clientsWithContracts}/>
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
};