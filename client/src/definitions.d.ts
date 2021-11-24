/* istanbul ignore file */
import { Types } from 'mongoose';


export interface IAlert {
  show: boolean;
  type: boolean;
  message: string;
};

export interface IConfirm {
  show: boolean;
  message: string;
  action: 'DELETE' | 'EDIT' | 'NONE';
};

export interface IState  {
  crews: Array<ICrew>;
  clients: Array<IClient>;
  jobs: Array<IJob>;
  packages: Array<IPackage>;
  contracts: Array<IContract>;
};

export interface IUserLocal {
  // name: string;
  email: string;
  admin: boolean;
};

export interface IUser {
  name: string;
  email: string;
  // password will need to be changed to bCrypt hash
  password: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export interface ICrew {
  _id: Types.ObjectId | string;
  foreman_name: string;
  crew_size: number;
  is_active: boolean;
  avatar?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export interface IClient {
  _id: Types.ObjectId | string;
  phone?: string;
  name: string;
  email: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export interface IJob {
  _id: Types.ObjectId | string;
  crew_id?: Types.ObjectId | string;
  contract_id: Types.ObjectId | string;
  date: Date;
  completed: boolean; 
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export interface IPackage {
  _id: Types.ObjectId | string;
  title: string;
  cost: number;
  description?: string;
  visit_interval_days: number;
  man_hrs_per_visit: number;
  contract_length_days: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export interface IContract {
  _id: Types.ObjectId | string;
  client_id: Types.ObjectId | string;
  package_id: Types.ObjectId | string;
  address: string;
  start_date: Date;
  job_notes?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};


export interface IthisMonth {
  startsOn: number;
  name: string;
  year: string;
  days: number;
  today: number;
};

// Job interface used in CrewCard component
// Includes address & jobNotes
export interface IJobLocal {
  _id? : Types.ObjectId | string;
  crew_id?: Types.ObjectId | string;
  contract_id: Types.ObjectId | string;
  date: Date;
  completed: boolean; 
  createdAt?: Date | string;
  updatedAt?: Date | string;
  address: string;
  jobNotes?: string;
  servicePackage?: IPackage;
  crew? : ICrew;
};

export interface ICrewLocal {
  foreman_name: string;
  crew_size: number;
  is_active: boolean;
  avatar?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export interface IClientLocal extends IClient {
  contracts: IContract[];
};

export interface IContractLocal extends IContract {
  client: IClient;
  selectedPackage: IPackage;
  address: string;
  start_date: Date;
  jobNotes?: string;
};
