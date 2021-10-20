import { Models, SchemaType, ObjectId, Schema} from 'mongoose';

export interface PackageModel extends SchemaType {
  _id?: ObjectId
  title: string;
  cost: number;
  description?: string;
  visit_interval_days: number;
  man_hrs_per_visit: number;
  contract_length_days: number;
};

export interface ClientModel extends SchemaType {
  _id?: ObjectId;
  phone?: string;
  name: string;
  email: string;
};

export interface CrewModel extends SchemaType {
  _id?: ObjectId;
  foreman_name: string;
  crew_size: number;
  is_active: boolean;
  avatar?: string;
};

export interface ContractModel extends SchemaType {
  _id?: ObjectId;
  client_id: ObjectId;
  package_id: ObjectId;
  address: string;
  start_date: Date;
  job_notes?: string;
};

export interface JobModel extends SchemaType {
  _id?: ObjectId;
  crew_id?: ObjectId;
  contract_id: ObjectId;
  date: Date;
  completed: boolean; 
};
