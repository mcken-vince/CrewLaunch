import axios, { AxiosResponse } from 'axios';
import { IClient, IState } from '../definitions';


const createNewClient = (client: IClient): Promise<AxiosResponse<IClient>> => {
  return axios.post('/clients', client);  
};

export const handleClientCreation = async (client: IClient, state: IState, updateState: Function): Promise<IClient> => {
  try {
    const existingClient = await isExistingClient(client);
    let updatedClients: IClient[] | [] = [];
    let thisClient: IClient;
    if (existingClient) {
      const response = await updateClient(client);
      thisClient = response.data;
      updatedClients = state.clients.filter(c => c.email.toLowerCase() !== client.email.toLowerCase());
    } else {
      const response = await createNewClient(client);
      thisClient = response.data;
      updatedClients = [...state.clients];
    }
    
    updateState({clients: [...updatedClients, thisClient]});
    return thisClient;
  } catch (err) {
    throw err;
  }
};

const updateClient = (client: IClient): Promise<AxiosResponse<IClient>> => {
  return axios.post(`/clients/${client._id}`);
};

export const handleClientUpdate = async (client: IClient, state: IState, updateState: Function) => {
  try {
    const response = await updateClient(client);
    const updatedClient = response.data;

    const updatedClients = state.clients.filter(c => c.email.toLowerCase() !== client.email.toLowerCase());
    updateState({clients: [...updatedClients, updatedClient]});
  } catch (err) {
    throw err;
  }
};

/**
 * Returns client if client with matching name and email exists in the database, otherwise returns null.
 * @param client 
 * @returns 
 */
export const isExistingClient = async (client: IClient): Promise<IClient | boolean> => {
  try {
    const response: AxiosResponse<any> = await axios.get('/api/clients');
    const matchingClients = response.data.result.filter((c: IClient) => {
      return c.name.toLowerCase() === client.name.toLowerCase() && c.email.toLowerCase() === client.email.toLowerCase();
    });
    // return first matching client if there are any matches, otherwise return null
    const existingClient = matchingClients.length >= 1 ? matchingClients[0] : null;
    return existingClient;
  } catch (err) {
    throw err;
  }
};
