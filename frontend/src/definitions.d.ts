import { Document, Types } from 'mongoose';

export interface IState  {
  crews: Array<ICrew>;
  clients: Array<IClient>;
  jobs: Array<IJob>;
  packages: Array<IPackage>;
  contracts: Array<IContract>;
};

export interface ICrew extends Document {
  _id?: Types.ObjectId;
  foreman_name: string;
  crew_size: number;
  is_active: boolean;
  avatar?: string;
};

export interface IClient extends Document {
  _id?: Types.ObjectId;
  phone?: string;
  name: string;
  email: string;
};

export interface IJob extends Document {
  _id?: Types.ObjectId;
  crew_id?: Types.ObjectId;
  contract_id: Types.ObjectId;
  date: Date;
  completed: boolean; 
};

export interface IPackage extends Document {
  _id?: Types.ObjectId
  title: string;
  cost: number;
  description?: string;
  visit_interval_days: number;
  man_hrs_per_visit: number;
  contract_length_days: number;
};

export interface IContract extends Document {
  _id?: Types.ObjectId;
  client_id: Types.ObjectId;
  package_id: Types.ObjectId;
  address: string;
  start_date: Date;
  job_notes?: string;
};