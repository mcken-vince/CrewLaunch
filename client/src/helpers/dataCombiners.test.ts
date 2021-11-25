import { getJobsWithDetails, getContractsWithDetails, getClientsWithContracts, getCrewJobsWithDetails } from './dataCombiners';
import { sampleState } from '../tests/sampleData';

const { jobs, contracts, packages, clients, crews } = sampleState;

describe('getJobsWithDetails()', () => {
  it("should return an array of jobs with 'address', 'jobNotes', 'crew' and 'servicePackage' properties", () => {
    const result = getJobsWithDetails(jobs, contracts, packages, crews);
    expect(result).toBeInstanceOf(Array);
    expect(typeof result[0].address).toBe('string');
    expect(typeof result[0].jobNotes).toBe('string');
    expect(result[0].servicePackage).not.toBe(undefined);
    expect(result[0].crew).not.toBe(undefined);
  });
});

describe('getContractsWithDetails()', () => {
  it("should return an array of contracts with 'client' and 'selectedPackage' properties", () => {
    const result = getContractsWithDetails(contracts, packages, clients);
    const firstContractClient = result[0].client;
    expect(result).toBeInstanceOf(Array);
    expect(typeof result[0].selectedPackage).not.toBe(undefined);
    expect(typeof firstContractClient.email).toBe('string');
    expect(typeof firstContractClient.name).toBe('string');
  });
});

describe('getClientsWithContracts()', () => {
  it("should return an array of clients with 'contracts' property", () => {
    const result = getClientsWithContracts(clients, contracts);
    expect(result[0].contracts).not.toBeUndefined();
  });
});

describe('getCrewJobsWithDetails()', () => {
  it("should return an array of this crew's jobs with their details", () => {
    const crewId = crews[0]._id.toString();
    const result = getCrewJobsWithDetails(crewId, crews, jobs, packages, contracts, clients);
    expect(result[0].crew_id).toBe(crewId);
    expect(result[0].address).not.toBeUndefined();
    expect(result[0].servicePackage).not.toBeUndefined();
  });
});