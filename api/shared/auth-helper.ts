import { sign } from 'jsonwebtoken';
import { compare, hash } from 'bcrypt';
import { IUser } from '../interfaces/user.interface';
import { environment } from '../environments/environment';

export const generateAuthToken = (user: IUser) => {
  return sign(user, environment.jwtSecret, { expiresIn: environment.jwtExpiry });
};

export const isValidPassword = async (password: string, hash: string) => {
  return await compare(password, hash);
};

export const hashPassword = async (password: string) => {
  return await hash(password, environment.bcryptSaltRounds);
};
