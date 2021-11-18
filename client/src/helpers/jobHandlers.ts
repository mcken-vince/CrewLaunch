import { IContractLocal, IJobLocal } from "../components/component-types";
import addDays from 'date-fns/addDays';
import { IJob, IState } from "../definitions";
import axios, { AxiosResponse } from "axios";

const createNewJob = (job: IJobLocal): Promise<AxiosResponse<IJob>> => {
  return axios.post('/jobs', job);
};

export const generateJobsFromContract = async (contract: IContractLocal): Promise<IJobLocal[]> => {
  try {
    const start: Date = new Date(contract.start_date);
    const contractLength: number = contract.selectedPackage.contract_length_days;
    const visitInterval: number = contract.selectedPackage.visit_interval_days;
    const jobCount = Math.round(contractLength / visitInterval);
    const jobsArray: IJobLocal[] = [];
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
    return jobsArray;
  } catch (err) {
    throw err;
  }
};


export const createJobs = async (jobs: IJobLocal[]): Promise<IJobLocal[]> => {
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
    const createdJobs: IJobLocal[] = await createJobs(jobArray);
    const updatedJobs = [...state.jobs, ...createdJobs];
    updateState({jobs: updatedJobs});
    return 'Jobs created!';
  } catch (err) {
    throw err;
  }
};

export const assignJobToCrew = (crewId: string, job: IJob, state: IState, updateState: Function) => {
  const updatedJob = {...job, crew_id: crewId};
  const updatedJobs = [...[...state.jobs].filter(j => j._id.toString() !== job._id), updatedJob];
  updateState({jobs: updatedJobs});
};
