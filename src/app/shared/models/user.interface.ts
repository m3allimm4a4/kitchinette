import { Entity } from './entity.interface';

export interface User extends Entity {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  password: string;
  roles: UserRole[];
}

export enum UserRole {
  NORMAL = 'NORMAL',
  ADMIN = 'ADMIN',
}
