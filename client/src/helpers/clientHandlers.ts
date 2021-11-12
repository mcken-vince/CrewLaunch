import axios, { AxiosResponse } from 'axios';
import { IClient, IState } from '../definitions';


const createNewClient = (client: IClient) => {
  return axios.post('/clients', client);  
};

export const handleClientCreation = async (client: IClient, state: IState, updateState: Function) => {
  try {
    const response = await createNewClient(client);
    const newClient = response.data;
    const updatedClients = [...state.clients, newClient];
    updateState({clients: updatedClients});
  } catch (err) {
    throw err;
  }
};

/**
 * Returns client if client with matching name and email exists in the database, otherwise returns null.
 * @param client 
 * @returns {boolean}
 */
export const isExistingClient = async (client: IClient) => {
  try {
    const response: AxiosResponse<any> = await axios.get('/clients');
    const matchingClients = response.data.clients.filter((c: IClient) => {
      return c.name.toLowerCase() === client.name.toLowerCase() && c.email.toLowerCase() === client.email.toLowerCase();
    });
    // return first matching client if there are any matches, otherwise return null
    const existingClient = matchingClients.length >= 1 ? matchingClients[0] : null;
    return existingClient;
  } catch (err) {
    throw err;
  }
};
