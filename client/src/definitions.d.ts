import { Types } from 'mongoose';

export interface IState  {
  crews: Array<ICrew>;
  clients: Array<IClient>;
  jobs: Array<IJob>;
  packages: Array<IPackage>;
  contracts: Array<IContract>;
};

export interface IUser {
  name: string;
  email: string;
  // password will need to be changed to bCrypt hash
  password: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface ICrew {
  _id?: Types.ObjectId | string;
  foreman_name: string;
  crew_size: number;
  is_active: boolean;
  avatar?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export interface IClient {
  _id?: Types.ObjectId | string;
  phone?: string;
  name: string;
  email: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export interface IJob {
  _id?: Types.ObjectId | string;
  crew_id?: Types.ObjectId | string;
  contract_id: Types.ObjectId | string;
  date: Date;
  completed: boolean; 
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export interface IPackage {
  _id?: Types.ObjectId | string;
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
  _id?: Types.ObjectId | string;
  client_id: Types.ObjectId | string;
  package_id: Types.ObjectId | string;
  address: string;
  start_date: Date;
  job_notes?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};