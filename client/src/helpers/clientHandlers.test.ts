import { handleClientCreation, handleClientUpdate, isExistingClient } from './clientHandlers';
import axios from 'axios';
import { getClients, sampleState } from '../tests/sampleData';


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const nonExistentClient = { _id: "283h7cnea803eed1iq414291", name: 'Nonexistent Joe', email: 'nonexistent@mail.com', phone: '504-191-1251' };

describe('isExistingClient()', () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue(getClients);
  });
  
  it ('should return the requested client if it exists', async () => {
    const result = await isExistingClient(getClients.data.result[0]);
    expect(result).toBe(getClients.data.result[0]);
  });

  it('should return null if the requested client does not exist', async () => {
    const result = await isExistingClient(nonExistentClient);
    expect(result).toBe(null);
  });
});

describe('handleClientCreation()', () => {
  it('calls updateState function', async () => {
    const updateState = jest.fn();
    mockedAxios.get.mockResolvedValue(getClients);
    mockedAxios.post.mockResolvedValue({});
    await handleClientCreation(sampleState.clients[0], sampleState, updateState);
    expect(updateState).toHaveBeenCalled();
  });
});

describe('handleClientUpdate()', () => {
  it('calls updateState function', async () => {
    const updateState = jest.fn();
    mockedAxios.get.mockResolvedValue(getClients);
    mockedAxios.post.mockResolvedValue({});
    await handleClientUpdate(sampleState.clients[0], sampleState, updateState);
  });
});