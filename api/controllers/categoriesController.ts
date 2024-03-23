import { catchAsync } from 'api/shared/catchAsync';
import { prisma } from 'api/models/prismaClient';
import * as express from 'express';

export const getCategories = catchAsync(async (req: express.Request, res: express.Response): Promise<void> => {
  const categories = await prisma.categories.findMany();
  res.status(200).json(categories);
});

export const deleteCategory = catchAsync(async (req: express.Request, res: express.Response): Promise<void> => {
  const id = +req.params['id'];
  if (!id) throw new Error('Invalid ID');
  await prisma.categories.delete({
    where: {
      id: id,
    },
  });
  res.status(204).send();
});

export const createCategory = catchAsync(async (req: express.Request, res: express.Response): Promise<void> => {
  const name: string = req.body.name;
  if (!name) throw new Error('Invalid Name');
  const newCategory = await prisma.categories.create({
    data: {
      name: name,
    },
  });
  res.status(200).json(newCategory);
});

export const updateCategory = catchAsync(async (req: express.Request, res: express.Response): Promise<void> => {
  const id: number = req.body.id;
  const name: string = req.body.name;
  if (!id || !name) throw new Error('Invalid Data');

  const newCategory = await prisma.categories.update({
    data: {
      name: {
        set: name,
      },
    },
    where: {
      id: id,
    },
  });
  res.status(200).json(newCategory);
});
