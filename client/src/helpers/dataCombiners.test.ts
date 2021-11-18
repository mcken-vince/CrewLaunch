import { getJobsWithDetails, getContractsWithDetails } from './dataCombiners';
import { sampleState } from '../tests/sampleData';

const { jobs, contracts, packages, clients, crews } = sampleState;

describe('getJobsWithDetails helper function', () => {
  it("should return an array of jobs with 'address', 'jobNotes', 'crew' and 'servicePackage' properties", () => {
    const result = getJobsWithDetails(jobs, contracts, packages, crews);
    expect(result).toBeInstanceOf(Array);
    expect(typeof result[0].address).toBe('string');
    expect(typeof result[0].jobNotes).toBe('string');
    expect(result[0].servicePackage).not.toBe(undefined);
    expect(result[0].crew).not.toBe(undefined);
  });
});

describe('getContractsWithDetails helper function', () => {
  it("should return an array of contracts with 'client' and 'selectedPackage' properties", () => {
    const result = getContractsWithDetails(contracts, packages, clients);
    const firstContractClient = result[0].client;
    expect(result).toBeInstanceOf(Array);
    expect(typeof result[0].selectedPackage).not.toBe(undefined);
    expect(typeof firstContractClient.email).toBe('string');
    expect(typeof firstContractClient.name).toBe('string');
  });
});