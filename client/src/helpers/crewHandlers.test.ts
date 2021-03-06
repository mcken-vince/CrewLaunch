import axios from 'axios';
import { handleCrewCreation, handleCrewDeletion } from './crewHandlers';
import { sampleState } from '../tests/sampleData';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('handleCrewCreation()', () => {
  it('calls updateState', async () => {
    const updateState = jest.fn();
    mockedAxios.get.mockResolvedValue({});
    mockedAxios.post.mockResolvedValue({});
    await handleCrewCreation(sampleState.crews[0], sampleState, updateState);
  });
});

describe('handleCrewDeletion()', () => {
  it('calls updateState', async () => {
    const crewId = 'GJ20a9hg0sc9hv09h209zgggj';
    const updateState = jest.fn();
    mockedAxios.get.mockResolvedValue({});
    mockedAxios.post.mockResolvedValue({});
    await handleCrewDeletion(crewId, sampleState, updateState);
  });
});