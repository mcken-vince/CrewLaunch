import { Document, Types, Schema, model} from 'mongoose';
import { Jwt } from 'jsonwebtoken';

export interface IUser extends Document {
  _id?: Types.ObjectId;
  email: string;
  password: string;
  admin: boolean;
  registered: Date;
  token: Jwt;
  createdAt?: Date;
  updatedAt?: Date;
};

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  registered: {
    type: Date,
    default: new Date()
  },
  admin: {
    type: Boolean,
    default: false
  },
  token: String
}, { timestamps: true });

export const UserModel = model<IUser>('User', UserSchema);
