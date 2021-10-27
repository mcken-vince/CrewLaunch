import { IClient, IPackage, ICrew, IJob, IUser } from '../definitions';
import { Types } from 'mongoose';
import { ReactDatePickerProps } from 'react-datepicker';
import { EventHandler } from 'react';

export interface DispatchCalendarProps {
  jobs: IJobLocal[];
};

export interface PackagesOffcanvasProps {
  show: boolean;
  handleClose: Function;
  packages: IPackage[];
  selectPackage: Function;
};

export interface PackageFormProps {
  onSubmit: PackageFormOnSubmitFunction;
  editPackage: IPackage | null;
};

type PackageFormOnSubmitFunction = {
  (IPackage): Promise<IPackage>;
};

export interface PackageCardProps {
  packageDetails: IPackage;
  onSelect: Function;
};

export interface JobCardProps extends IJobLocal {

};

export interface DispatchNavProps {
  user: IUser
};

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

export interface DateRangePickerProps extends ReactDatePickerProps {
  onChange: EventHandler<any>;
  selected?: Date;
  startDate: Date;
  endDate: Date
  inheritClassName? : string;
};

export interface CrewCardProps {
  crew: ICrew;
  jobs: IJobLocal[];
};

// Job interface used in CrewCard component
// Includes address & jobNotes
export interface IJobLocal extends IJob {
  address?: string;
  jobNotes?: string;
  servicePackage?: IPackage;
};

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
};

export interface ContractFormProps {
  packages: IPackage[];
  onSubmit: Function;
  editContract: IContractLocal | null;
};