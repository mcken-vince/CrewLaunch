import { IJob, IContract, IPackage, IClient } from "../definitions";
import { IContractLocal, IJobLocal } from "../components/component-types";


/**
 * Takes in state object and returns an array of all jobs including address, jobnotes, and package details
 * @param state 
 * @returns Array of jobs
 */
export const getJobsWithDetails = (jobs: IJob[], contracts: IContract[], packages: IPackage[]):IJobLocal[] => {

  const jobsWithDetails = jobs.map(job => {
    const newJob: IJobLocal = {...job};
    const thisContract = contracts.filter(c => c._id === job.contract_id)[0];
    newJob.address = thisContract.address;
    newJob.jobNotes = thisContract.job_notes; 
    const thisPackage = packages.filter(p => p._id === thisContract.package_id)[0];
    newJob.servicePackage = thisPackage;
    return newJob;
  });
  // console.log(jobsWithDetails);
  return jobsWithDetails;
};

/**
 * Takes in state object and returns an array of all contracts including client and package details
 * @param state 
 * @returns Array of contracts
 */
export const getContractsWithDetails = (contracts: IContract[], packages: IPackage[], clients: IClient[]): IContractLocal[] => {
  const contractsWithDetails = contracts.map(contract => {
    const thisClient = clients.filter(c => c._id === contract.client_id)[0];
    const thisPackage = packages.filter(p => p._id === contract.package_id)[0];
    const newContract = {...contract, client: thisClient, selectedPackage: thisPackage};
    return newContract;
  });

  return contractsWithDetails;
};

export const getClientsWithContracts = (clients: IClient[], contracts: IContract[]) => {
  const clientsWithContracts = clients.map(client => {
    const thisClientsContracts = contracts.filter(contract => contract.client_id.toString() === client._id.toString());
    return {...client, contracts: thisClientsContracts};
  });
  return clientsWithContracts;
};