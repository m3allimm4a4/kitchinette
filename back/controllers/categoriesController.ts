import { RequestHandler } from 'express';
import { catchAsync } from '../shared/catchAsync';
import { Category } from '../models/category.model';
import { InvalidIdError } from '../errors/invalid-id.error';

export const getCategories: RequestHandler = catchAsync(async (_req, res): Promise<void> => {
  const categories = await Category.find();
  res.status(200).json(categories);
});

export const deleteCategory: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const id = req.params['id'];
  if (!id) throw new InvalidIdError();
  await Category.findByIdAndDelete(id);
  res.status(204).send();
});

export const createCategory: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const name: string = req.body.name;
  if (!name) throw new Error('Invalid Name');
  const newCategory = await Category.create({ name: name });
  res.status(200).json(newCategory);
});

export const updateCategory: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const id = req.params['id'];
  const name: string = req.body.name;
  if (!id || !name) throw new Error('Invalid Data');
  const oldCategory = await Category.findByIdAndUpdate(id, { name: name });
  res.status(200).json(oldCategory);
});
