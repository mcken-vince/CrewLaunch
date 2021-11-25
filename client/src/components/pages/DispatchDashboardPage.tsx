import '../../styles/DispatchDashboardPage.scss';
import { MouseEventHandler, useMemo } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ICrew, IJob, IPackage, IUserLocal, IClientLocal, IContractLocal, IJobLocal  } from '../../definitions';
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
import { handleContractCreation, handleContractDeletion } from '../../helpers/contractHandlers';
import { handleCrewCreation, handleCrewDeletion } from '../../helpers/crewHandlers';
import ClientsPage from './ClientsPage';
import JobsPage from './JobsPage';
import { assignJobToCrew, markJobComplete } from '../../helpers/jobHandlers';
import DispatchNav from '../DispatchNav';
import ScrollTop from '../ScrollTop';

const DispatchDashboardPage = (props: DispatchDashboardPageProps) => {
  const {state, updateState} = useAppData();
  const { user, onLogout } = props;

  // const handleSubmit = (resource: any) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //     resolve(resource)}, 500);
  //   });
  // };
 
  const detailedJobs: IJobLocal[] = useMemo(() => {
    return state ? getJobsWithDetails(state.jobs, state.contracts, state.packages, state.crews) : 
    getJobsWithDetails([], [] , [], [])
  }, [state]);
  const detailedContracts: IContractLocal[] = useMemo(() => getContractsWithDetails(state ? state.contracts : [], state ? state.packages : [], state ? state.clients : []), [state]);
  const clientsWithContracts: IClientLocal[] = useMemo(() => getClientsWithContracts(state ? state.clients : [], state ? state.contracts : []), [state]);

  return (
      <div className='dispatch-dashboard-container'> 
        <DispatchNav user={user} onLogout={onLogout}/>
          <Switch>
            <Route path={`/dispatch/crews/new`}>
              <CrewForm 
                onSubmit={(crew: ICrew) => {state && handleCrewCreation(crew, state, updateState)}} 
                editCrew={null}
              />
            </Route>
            <Route path={`/dispatch/packages/new`}>
              <PackageForm 
                onSubmit={(pkg: IPackage) => state && handlePackageCreation(pkg, state, updateState)} 
                packages={state ? state.packages : []}
              />
            </Route>
            <Route path={`/dispatch/contracts/new/clients/:client_id`}>
              <ContractForm 
                packages={state ? state.packages : []} 
                onSubmit={(con: IContractLocal) => {state && handleContractCreation(con, state, updateState)}} 
                contracts={detailedContracts} 
                clients={state ? state.clients : []}
              />
            </Route>
            <Route path={`/dispatch/contracts/new`}>
              <ContractForm 
                packages={state ? state.packages : []} 
                onSubmit={(con: IContractLocal) => {state && handleContractCreation(con, state, updateState)}} 
                contracts={detailedContracts} 
                clients={state ? state.clients : []}
              />
            </Route>
            <Route path={`/dispatch/crews`}>
              <CrewsPage 
                onDelete={(id: string) => state && handleCrewDeletion(id, state, updateState)} 
                crews={state ? state.crews : []}
              />
            </Route>
            <Route path={`/dispatch/packages`}>
              <PackagesPage 
                packages={state ? state.packages : []} 
                onDelete={(id: string) => state && handlePackageDeletion(id, state, updateState)}/>
            </Route>
            <Route path={`/dispatch/contracts`}>
              <ContractsPage 
                contracts={detailedContracts} 
                onDelete={(id: string) => state && handleContractDeletion(id, state, updateState)}
              />
            </Route>
            <Route path={`/dispatch/clients`}>
              <ClientsPage clients={clientsWithContracts} contracts={detailedContracts}/>
            </Route>
            <Route path={`/dispatch/jobs`}>
              <JobsPage 
                jobs={detailedJobs} 
                crews={state ? state.crews : []} 
                assignJobToCrew={(crewId: string | undefined, job: IJob) => state && assignJobToCrew(crewId, job, state, updateState)} 
                markJobComplete={(job: IJob, complete: boolean) => state && markJobComplete(job, complete, state, updateState)} />
            </Route>
            <Route path={`/dispatch`}>
              <DispatchCalendar 
                jobs={detailedJobs} 
                crews={state ? state.crews : []} 
                assignJobToCrew={(crewId: string, job: IJob) => state && assignJobToCrew(crewId, job, state, updateState)} 
                markJobComplete={(job: IJob, complete: boolean) => state && markJobComplete(job, complete, state, updateState)}/>
            </Route>
          </Switch>
        <ScrollTop />
      </div>
  );
};

export default DispatchDashboardPage;

export interface DispatchDashboardPageProps {
  user: IUserLocal;
  onLogout: MouseEventHandler<HTMLButtonElement>;
};