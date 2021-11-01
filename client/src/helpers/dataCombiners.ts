import { IJob, IContract, IPackage } from "../definitions";
import { IJobLocal } from "../components/component-types";


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
  console.log(jobsWithDetails)
  return jobsWithDetails;
};
