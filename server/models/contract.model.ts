import { Types, Schema, Document, model } from 'mongoose';

export interface IContract extends Document {
  _id?: Types.ObjectId;
  client_id: Types.ObjectId;
  package_id: Types.ObjectId;
  address: string;
  start_date: Date;
  job_notes?: string;
};

const ContractSchema = new Schema<IContract>({
  package_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  client_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  job_notes: {
    type: String,
    required: true
  },
  start_date: {
    type: Date,
    required: true
  }
}, { timestamps: true });

export const ContractModel = model<IContract>('Contract', ContractSchema);
