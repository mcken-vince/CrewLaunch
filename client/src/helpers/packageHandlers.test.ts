import { handlePackageCreation, handlePackageDeletion } from './packageHandlers';
import axios from 'axios';
import { sampleState } from '../tests/sampleData';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('handlePackageCreation()', () => {
  it('calls updateState', async () => {
    const updateState = jest.fn();
    mockedAxios.get.mockResolvedValue({});
    mockedAxios.post.mockResolvedValue({});
    await handlePackageCreation(sampleState.packages[0], sampleState, updateState);
    expect(updateState).toHaveBeenCalled();
  });
});

describe('handlePackageDeletion()', () => {
  it('calls updateState', async () => {
    const packageId = '58103vnfjfFAFJ34298vhva';
    const updateState = jest.fn();
    mockedAxios.get.mockResolvedValue({});
    mockedAxios.post.mockResolvedValue({});
    mockedAxios.delete.mockResolvedValue({});
    await handlePackageDeletion(packageId, sampleState, updateState);
    expect(updateState).toHaveBeenCalled();
  });
});