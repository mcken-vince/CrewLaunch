import axios, { AxiosResponse } from 'axios';
import { IContractLocal } from '../components/component-types';
import { IClient, IContract, IState } from "../definitions";
import { handleClientCreation } from './clientHandlers';

export const createNewContract = (newContract: IContract): Promise<AxiosResponse<IContract>> => {
    return axios.post('/contracts', newContract);
};

export const handleContractCreation = async (contract: IContractLocal, state: IState, updateState: Function): Promise<IContract> => {
  try {
    const client: IClient = await handleClientCreation(contract.client, state, updateState);
    
    const response = await createNewContract({...contract, client_id: client._id});
    const newContract: IContract = response.data;
    const contracts = [ ...state.contracts, newContract ];
    updateState({contracts});

    return newContract;
  } catch (err){
    throw err;
  }
};

export const deleteContract = (contractId: string) => {
  return axios.delete(`/contracts/${contractId}`);
};

export const handleContractDeletion = async (contractId: string, state: IState, updateState: Function) => {
  await deleteContract(contractId);
  const contracts = state.contracts.filter(c => c._id?.toString() !== contractId);
  updateState({contracts});
};
