import { IClient, IPackage, ICrew, IJob, IUser } from '../definitions';
import { Types } from 'mongoose';
import { ReactDatePickerProps } from 'react-datepicker';

export interface PackagesOffcanvasProps {
  show: Function;
  handleClose: Function;
  packages: IPackage[];
  selectPackage: Function;
};

export interface PackageFormProps {
  onSubmit: PackageFormOnSubmitFunction;
  editPackage: IPackage;
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
  name: string;
  year: string;
  days: number;
};

export interface DayCardProps {
  date: string;
  jobs: IJobLocal[];
  key?: number;
};

export interface DateRangePickerProps extends ReactDatePickerProps {
  onChange: VoidFunction;
  selected: Date;
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
  address: string;
  jobNotes: string;
  servicePackage: IPackage;
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
  packages: {};
  onSubmit: Function;
  editContract: IContractLocal;
};