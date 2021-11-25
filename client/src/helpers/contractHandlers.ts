import axios, { AxiosResponse } from 'axios';
import { IClient, IContract, IState, IContractLocal } from "../definitions";
import { handleClientCreation } from './clientHandlers';
import { handleJobCreation } from './jobHandlers';

export const createNewContract = (newContract: IContract): Promise<AxiosResponse<IContract>> => {
    return axios.post('/contracts', newContract);
};

export const handleContractCreation = async (contract: IContractLocal, state: IState, updateState: Function): Promise<IContract> => {
  try {
    let client: IClient;
    if (contract.client._id) {
      client = contract.client;
    } else {
      client = await handleClientCreation(contract.client, state, updateState);
    }
    const response = await createNewContract({...contract, client_id: client._id});
    const newContract: IContract = response.data;
    const contracts = [ ...state.contracts, newContract ];
    updateState({contracts});

    const newContractWithDetails: IContractLocal = {...newContract, client: contract.client, selectedPackage: contract.selectedPackage };
    await handleJobCreation(newContractWithDetails, state, updateState);
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
