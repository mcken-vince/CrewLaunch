import mongoose from 'mongoose';

export interface IPackage extends mongoose.Document {
  _id?: mongoose.ObjectId
  title: string;
  cost: number;
  description?: string;
  visit_interval_days: number;
  man_hrs_per_visit: number;
  contract_length_days: number;
};

const PackageSchema = new mongoose.Schema<IPackage>({
  title: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  contract_length_days: {
    type: Number,
    required: true
  },
  visit_interval_days: {
    type: Number,
    required: true
  },
  man_hrs_per_visit: {
    type: Number,
    required: true
  },
  description: String,
  
}, { timestamps: true });

export const PackageModel = mongoose.model<IPackage>('Package', PackageSchema);