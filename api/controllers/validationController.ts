import { RequestHandler } from 'express';
import { catchAsync } from '../shared/catchAsync';
import { User } from '../models/user.model';

export const uniqueEmail: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const email = req.query['email'];
  if (!email) {
    res.status(200).json({ valid: false });
    return;
  }
  const user = await User.findOne({ email: email });
  res.status(200).json({ valid: !user });
});
