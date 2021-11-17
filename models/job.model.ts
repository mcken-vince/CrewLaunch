import { Document, Schema, Types, model } from 'mongoose';

export interface IJob extends Document {
  _id?: Types.ObjectId;
  crew_id?: Types.ObjectId;
  contract_id: Types.ObjectId;
  date: Date;
  completed: boolean; 
};

const JobSchema = new Schema<IJob>({
  crew_id: {
    type: Schema.Types.ObjectId,
    ref: "Crew"
  },
  contract_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Contract"
  },
  completed: {
    type: Boolean,
    default: false
  },
  date: Date
});

export const JobModel = model<IJob>('Job', JobSchema);