import { Types, Document, Schema, model} from 'mongoose';

export interface IClient extends Document {
  _id?: Types.ObjectId;
  phone?: string;
  name: string;
  email: string;
};

const ClientSchema = new Schema<IClient>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  phone: String
}, { timestamps: true });

export const ClientModel = model<IClient>('Client', ClientSchema);
export default ClientModel;