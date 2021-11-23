import { isExistingClient } from './clientHandlers';
import axios from 'axios';
import { getClients } from '../tests/sampleData';

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
