import axios from 'axios';
import { IState } from '../definitions';

export const deletePackage = (packageId: string) => {
  return axios.delete(`/packages/${packageId}`);
};

export const handlePackageDeletion = async (packageId: string, state: IState, updateState: Function) => {
  await deletePackage(packageId);
  const packages = state.packages.filter(p => p._id?.toString() !== packageId);
  updateState({packages});
};