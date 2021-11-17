import { IContractLocal } from "../components/component-types";
import addDays from 'date-fns/addDays';
import { IJob, IState } from "../definitions";
import axios, { AxiosResponse } from "axios";

const createNewJob = (job: IJob): Promise<AxiosResponse<IJob>> => {
  return axios.post('/jobs', job);
};

export const generateJobsFromContract = async (contract: IContractLocal): Promise<IJob[]> => {
  try {
    // if (!contract._id) {
    //   console.log('no contract id!!!!!');
    //   return []
    // };
    console.log('contract to generate jobs from: ', contract);
    const start: Date = new Date(contract.start_date);
    const contractLength: number = contract.selectedPackage.contract_length_days;
    const visitInterval: number = contract.selectedPackage.visit_interval_days;
    const jobCount = Math.round(contractLength / visitInterval);
    const jobsArray: IJob[] = [];
    for (let x = 0; x < jobCount; x++) {
      const thisJobDate: Date = addDays(start, x * visitInterval);
      jobsArray.push(
        {
          contract_id: contract._id,
          date: thisJobDate,
          completed: false,
        }
        );
      };
    console.log('jobsArray in genjobsfromcontract', jobsArray);
    return jobsArray;
  } catch (err) {
    throw err;
  }
};


export const createJobs = async (jobs: IJob[]): Promise<IJob[]> => {
  try {
    const response: AxiosResponse<IJob>[] = await Promise.all(
      jobs.map(j => createNewJob(j))
      );
      const createdJobs = response.map(r => r.data);
      return createdJobs;
  } catch (err) {
    throw err;
  }
};

export const handleJobCreation = async (contract: IContractLocal, state: IState, updateState: Function): Promise<string> => {
  try {
    const jobArray = await generateJobsFromContract(contract);
    console.log('jobArray: ', jobArray);
    const createdJobs = await createJobs(jobArray);
    console.log('createdJobs: ', createdJobs);
    const updatedJobs = [...state.jobs, ...createdJobs];
    console.log('updatedJobs: ', updatedJobs);
    updateState({jobs: updatedJobs});
    console.log('Jobs created!');
    return 'Jobs created!';
  } catch (err) {
    throw err;
  }
};