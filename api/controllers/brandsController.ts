import { catchAsync } from 'api/shared/catchAsync';
import { prisma } from 'api/models/prismaClient';
import * as express from 'express';

export const getBrands = catchAsync(async (req: express.Request, res: express.Response): Promise<void> => {
  const brands = await prisma.brands.findMany();
  res.status(200).json(brands);
});
