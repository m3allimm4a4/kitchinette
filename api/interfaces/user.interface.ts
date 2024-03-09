import { IEntity } from './entity.interface';

export interface IUser extends IEntity {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  password: string;
}
