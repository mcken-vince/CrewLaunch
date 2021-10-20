import { Document, Schema, Types, model } from 'mongoose';

export interface ICrew extends Document {
  _id?: Types.ObjectId;
  foreman_name: string;
  crew_size: number;
  is_active: boolean;
  avatar?: string;
};

const CrewSchema = new Schema<ICrew>({
  foreman_name: {
    type: String,
    required: true
  },
  crew_size: {
    type: Number,
    required: true
  },
  is_active: {
    type: Boolean,
    default: true
  },
  avatar: String
}, { timestamps: true });

export const CrewModel = model<ICrew>('Crew', CrewSchema);
