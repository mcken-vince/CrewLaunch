import { handleContractCreation, handleContractDeletion } from './contractHandlers';
import axios from 'axios';
import { sampleState, localContracts } from '../tests/sampleData';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('handleContractCreation()', () => {
  it('calls updateState', async () => {
    const updateState = jest.fn();
    mockedAxios.get.mockResolvedValue({});
    mockedAxios.post.mockResolvedValue({});
    await handleContractCreation(localContracts[0], sampleState, updateState);
  });
});

describe('handleContractDeletion()', () => {
  it('calls updateState', async () => {
    const contractId = 'f209fasgGHAH3402gha0hsdglsdjf';
    const updateState = jest.fn();
    mockedAxios.get.mockResolvedValue({});
    mockedAxios.post.mockResolvedValue({});
    await handleContractDeletion(contractId, sampleState, updateState);
  });
});