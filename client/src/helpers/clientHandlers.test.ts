import { isExistingClient } from './clientHandlers';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const getClients = {data:{result:[ { "_id": "616f7ceea703ecd4ec419646", "name": "Gregory Peck", "email": "regreg@peck.com", "phone": "403-552-9094", "createdAt": "2021-10-20T02:20:30.796Z", "updatedAt": "2021-10-20T02:20:30.796Z", "__v": 0 } ]}};

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
