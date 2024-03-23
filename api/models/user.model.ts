import { model, Schema } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

export const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true },
);

export const User = model<IUser>('User', UserSchema);
