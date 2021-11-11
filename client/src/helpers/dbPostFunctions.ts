import axios from 'axios';
import { IPackage } from "../definitions";

export const createNewPackage = async (newPackage: IPackage) => {
  try {
    const pkg = await axios.post('/packages', newPackage);
    return pkg;

  } catch (err){
    throw err;
  }
};