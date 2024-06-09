import { RequestHandler } from 'express';
import { catchAsync } from '../shared/catchAsync';
import { generateAuthToken, hashPassword, isValidPassword } from '../shared/auth-helper';
import { User } from '../models/user.model';
import { UnauthorizedError } from '../errors/unauthorized.error';
import { IUser, UserRole } from '../interfaces/user.interface';
import { environment } from '../environments/environment';

export const login: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new UnauthorizedError();
  }
  if (!await isValidPassword(password, user.password)) {
    throw new UnauthorizedError();
  }
  const userObject = user.toObject();
  const token = generateAuthToken(userObject);
  res.status(200).json({
    accessToken: token,
    expiresIn: environment.jwtExpiry,
    user: {
      ...userObject,
      password: undefined,
    },
  });
});

export const signUp: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const user = req.body as IUser;
  user.password = await hashPassword(user.password);
  const newUser = await User.create({
    email: user.email,
    password: user.password,
    roles: [UserRole.NORMAL],
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    phone: user.phone,
    city: user.city,
  });
  const newUserObject = newUser.toObject()
  const token = generateAuthToken(newUserObject);
  res.status(200).json({
    accessToken: token,
    expiresIn: environment.jwtExpiry,
    user: {
      ...newUserObject,
      password: undefined,
    },
  });
});
