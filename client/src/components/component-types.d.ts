/* istanbul ignore file */
import { IClient, IPackage, IJob, IContract, ICrew } from '../definitions';
import { ReactDatePickerProps } from 'react-datepicker';
import { EventHandler } from 'react';

export interface IthisMonth {
  startsOn: number;
  name: string;
  year: string;
  days: number;
  today: number;
};

export interface DayCardProps {
  date?: string;
  jobs?: IJobLocal[];
  key: number;
  selectDay?: VoidFunction<number>;
};

// Job interface used in CrewCard component
// Includes address & jobNotes
export interface IJobLocal {
  crew_id?: Types.ObjectId | string;
  contract_id: Types.ObjectId | string;
  date: Date;
  completed: boolean; 
  createdAt?: Date | string;
  updatedAt?: Date | string;
  address?: string;
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
