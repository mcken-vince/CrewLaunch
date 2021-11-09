import { Document, Types, Schema, model} from 'mongoose';

export interface IAdmin extends Document {
  _id: Types.ObjectId;
  email: string;
};

const AdminSchema = new Schema<IAdmin>({
  email: {
    type: String,
    required: true
  }
}, { timestamps: true });

export const AdminModel = model<IAdmin>('Admin', AdminSchema);
