import { RequestHandler } from 'express';
import { UnauthorizedError } from '../errors/unauthorized.error';
import { verify } from 'jsonwebtoken';
import { jwtSecret } from '../environments/environment.development';
import { IUser, UserRole } from '../interfaces/user.interface';

export const auth: (roles: UserRole[]) => RequestHandler = roles => {
  return (req, _res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.replace('Bearer ', '');
    if (!token) throw new UnauthorizedError();

    verify(token, jwtSecret, (error, decoded) => {
      if (error || !decoded) {
        throw new UnauthorizedError();
      }
      const user = decoded as IUser;
      if (user.roles.some(role => role === UserRole.ADMIN) || roles.some(role => user.roles.includes(role))) {
        next();
        return;
      }
      throw new UnauthorizedError();
    });
  };
};
