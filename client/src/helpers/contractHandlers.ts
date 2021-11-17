import axios, { AxiosResponse } from 'axios';
import { IContractLocal } from '../components/component-types';
import { IClient, IContract, IState } from "../definitions";
import { handleClientCreation } from './clientHandlers';
import { handleJobCreation } from './jobHandlers';

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

    console.log('about to call handleJobCreation');
    console.log('contract in handleContractCreation: ', contract);
    const newContractWithDetails: IContractLocal = {...newContract, client: contract.client, selectedPackage: contract.selectedPackage };
    await handleJobCreation(newContractWithDetails, state, updateState);
    
    console.log('and done!');
    
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
