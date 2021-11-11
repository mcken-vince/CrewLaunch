import axios from 'axios';
import { IPackage } from "../definitions";

const createNewPackage = (newPackage: IPackage) => {
  try {
    return axios.post('/packages', newPackage);
  } catch (err){
    throw err;
  }
};


export { createNewPackage }; 