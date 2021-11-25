import { IJobLocal } from "../definitions";
import { assignJob, assignJobToCrew, generateJobsFromContract, markComplete, markJobComplete } from "./jobHandlers";
import { localContracts, sampleState } from "../tests/sampleData";
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

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

describe('assignJob()', () => {
  it('should return the axios.post', async () => {
    mockedAxios.post.mockResolvedValue({test: 'yes'});
    const crewId = sampleState.crews[0]._id.toString();
    const result = await assignJob(sampleState.jobs[0], crewId);
    expect(result).toStrictEqual({test: 'yes'})
  });
});

describe('assignJobToCrew()', () => {
  it('works', async () => {
    const crewId = sampleState.crews[0]._id.toString();
    const updateState = jest.fn();
    mockedAxios.post.mockResolvedValue({});
    await assignJobToCrew(crewId, sampleState.jobs[0], sampleState, updateState);
  });
});

describe('markComplete()', () => {
  it('should return the axios.post', async () => {
    mockedAxios.post.mockResolvedValue({test: 'yes'});
    const result = await markComplete(sampleState.jobs[0], true);
    expect(result).toStrictEqual({test: 'yes'})
  });
});

describe('markJobComplete()', () => {
  it('works', async () => {
    const updateState = jest.fn();
    mockedAxios.post.mockResolvedValue({});
    await markJobComplete(sampleState.jobs[0], true, sampleState, updateState);
  });
});