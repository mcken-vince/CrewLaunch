import axios, { AxiosResponse } from 'axios';
import { IPackage, IState } from "../definitions";

export const createNewPackage = (newPackage: IPackage): Promise<AxiosResponse<IPackage>> => {
  try {
    return axios.post('/packages', newPackage);
  } catch (err){
    throw err;
  }
};

export const handlePackageCreation = async (pkg: IPackage, state: IState, updateState: Function): Promise<IPackage | null> => {
  if (!state) return null;
  try {
    const response = await createNewPackage(pkg);
    const newPackage: IPackage = response.data;
    const packages = [ ...state.packages, newPackage ];
    updateState({packages});

    return newPackage;
  } catch (err){
    throw err;
  }
};

export const deletePackage = (packageId: string): Promise<AxiosResponse<any>> => {
  return axios.delete(`/packages/${packageId}`);
};

export const handlePackageDeletion = async (packageId: string, state: IState, updateState: Function): Promise<{type: boolean, message: string}> => {
  try {
    // If there are any contracts using this package, then it cannot be deleted
    const contractsUsingPackage = state.contracts.filter(c => c.package_id.toString() === packageId);
    if (contractsUsingPackage.length !== 0) {
      return {type: false, message: 'Package is in use, you cannot delete it!'};
    }
    await deletePackage(packageId);
    const packages = state.packages.filter(p => p._id?.toString() !== packageId);
    updateState({packages});
    return {type: true, message: 'Package deleted!'};
  } catch (err) {
    throw err;
  }
};
