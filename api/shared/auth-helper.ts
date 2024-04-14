import { bcryptSaltRounds, jwtExpiry, jwtSecret } from '../environments/environment.development';
import { sign } from 'jsonwebtoken';
import { compare, hash } from 'bcrypt';
import { IUser } from '../interfaces/user.interface';

export const generateAuthToken = (user: IUser) => {
  return sign(user, jwtSecret, { expiresIn: jwtExpiry });
};

export const isValidPassword = async (password: string, hash: string) => {
  return await compare(password, hash);
};

export const hashPassword = async (password: string) => {
  return await hash(password, bcryptSaltRounds);
};
