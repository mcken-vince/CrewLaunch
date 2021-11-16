import { IContractLocal } from "../components/component-types";
import addDays from 'date-fns/addDays';
import { IJob } from "../definitions";

export const generateJobsFromContract = (contract: IContractLocal): IJob[] => {
  const start: Date = new Date(contract.start_date);
  const contractLength: number = contract.selectedPackage.contract_length_days;
  const visitInterval: number = contract.selectedPackage.visit_interval_days;
  const end: Date = addDays(start, contractLength);
  const jobCount = Math.round(contractLength / visitInterval);
  const jobsArray = [];
  for (let x = 0; x < jobCount; x++) {
    const thisJobDate: Date = addDays(start, x * visitInterval);
    jobsArray.push(
      {
        contract_id: contract._id,
        date: thisJobDate,
        completed: false
      }
    );
  };
  return jobsArray;
};

