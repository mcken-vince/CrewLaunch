import { IClient, IPackage, ICrew, IJob } from '../definitions';
import { Types } from 'mongoose';

export interface CrewCardProps {
  crew: ICrew;
  jobs: IJobLocal[];
}

// Job interface used in CrewCard component
// Includes address & jobNotes
export interface IJobLocal extends IJob {
  address: string;
  jobNotes: string;
  servicePackage: IPackage;
}

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