import { sign } from 'jsonwebtoken';
import { IUser } from '../interfaces/user.interface';
import { environment } from '../environments/environment';
import { randomUUID } from 'crypto';
import { hash, compare } from 'bcryptjs';

export const generateAuthToken = (user: IUser) => {
  return sign(user, environment.jwtSecret, { expiresIn: environment.jwtExpiry });
};

export const isValidPassword = async (password: string, hash: string) => {
  return await compare(password, hash);
};

export const hashPassword = async (password: string) => {
  return await hash(password, environment.bcryptSaltRounds);
};

export const generateVerificationToken = async () => {
  const uuid = randomUUID();
  return await hash(uuid, environment.bcryptSaltRounds);
};
