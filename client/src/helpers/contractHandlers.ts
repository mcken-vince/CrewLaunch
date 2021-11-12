import axios from 'axios';
import { IContract, IState } from "../definitions";


export const createNewContract = (newContract: IContract) => {
  try {
    return axios.post('/contracts', newContract);
  } catch (err){
    throw err;
  }
};

export const handleContractCreation = async (contract: IContract, state: IState, updateState: Function) => {
  if (!state) return false;
  try {
    const response = await createNewContract(contract);
    const newContract = response.data;
    const contracts = [ ...state.contracts, newContract ];
    updateState({contracts});

    return 'Contract created!';
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
