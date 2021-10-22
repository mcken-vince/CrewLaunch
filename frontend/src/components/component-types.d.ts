import { IClient, IContract, IPackage } from '../definitions';
import { Types } from 'mongoose';

export interface ClientCardProps {
  client: IClient;
};

export interface IContractLocal {
  _id?: Types.ObjectId;
  client: IClient;
  selectedPackage: IPackage;
  address: string;
  startDate: Date;
  jobNotes?: string;
}

export interface ContractFormProps {
  packages: {};
  onSubmit: Function;
  editContract: IContractLocal;
};