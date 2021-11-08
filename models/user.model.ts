import { Document, Types, Schema, model} from 'mongoose';
import { JsonWebTokenError, Jwt } from 'jsonwebtoken';

export interface IUser extends Document {
  _id?: Types.ObjectId;
  email: string;
  password: string; 
  registered: Date;
  token: Jwt;
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
  token: String
});

export const UserModel = model<IUser>('User', UserSchema);
