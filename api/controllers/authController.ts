import { RequestHandler } from 'express';
import { catchAsync } from '../shared/catchAsync';
import { generateAuthToken, generateVerificationToken, hashPassword, isValidPassword } from '../shared/auth-helper';
import { User } from '../models/user.model';
import { UnauthorizedError } from '../errors/unauthorized.error';
import { IUser, UserRole } from '../interfaces/user.interface';
import { environment } from '../environments/environment';
import { sendEmail } from '../shared/mail-sender';

export const login: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new UnauthorizedError();
  }
  if (!(await isValidPassword(password, user.password))) {
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
  const password = await hashPassword(user.password);
  const verificationHash = await generateVerificationToken();
  await User.create({
    email: user.email,
    password: password,
    roles: [UserRole.NORMAL],
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    phone: user.phone,
    city: user.city,
    verificationHash: verificationHash,
  });
  const params = {
    name: user.firstName,
    verificationUrl: verificationHash,
  };
  res.render('email-verification', params, async (err, html) => {
    if (err) {
      console.error(err);
      res.status(500).send('Something went wrong. Try again later.');
      return;
    }
    await sendEmail('Email verification', [user.email], html);
    res.status(200);
  });
});
