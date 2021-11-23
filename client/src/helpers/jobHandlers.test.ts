import { IJobLocal } from "../definitions";
import { generateJobsFromContract } from "./jobHandlers";
import { localContracts } from "../tests/sampleData";

describe('generateJobsFromContract()', () => {
  let result: IJobLocal[];
  generateJobsFromContract(localContracts[0])
  .then(res => result = res);

  it('should return an array of jobs', () => {
    expect(result).toBeInstanceOf(Array);
    const firstRes = result[0];
    expect(firstRes.completed).not.toBe(undefined);
    expect(firstRes.date).not.toBe(undefined);
    expect(firstRes.contract_id).not.toBe(undefined);
  });

  it('should return the correct number of jobs', () => {
    expect(result.length).toBe(6);
  });
});
