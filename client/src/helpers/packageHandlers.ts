import axios from 'axios';
import { IPackage, IState } from "../definitions";

export const createNewPackage = (newPackage: IPackage) => {
  try {
    return axios.post('/packages', newPackage);
  } catch (err){
    throw err;
  }
};

export const handlePackageCreation = async (pkg: IPackage, state: IState, updateState: Function) => {
  if (!state) return false;
  try {
    const newPackage = await createNewPackage(pkg);
    const packages = [ ...state.packages, newPackage ];
    updateState({packages});

    return 'Package created!';
  } catch (err){
    throw err;
  }
};

export const deletePackage = (packageId: string) => {
  return axios.delete(`/packages/${packageId}`);
};

export const handlePackageDeletion = async (packageId: string, state: IState, updateState: Function) => {
  await deletePackage(packageId);
  const packages = state.packages.filter(p => p._id?.toString() !== packageId);
  updateState({packages});
};
