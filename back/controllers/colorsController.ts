import { RequestHandler } from 'express';
import { catchAsync } from '../shared/catchAsync';
import { InvalidIdError } from '../errors/invalid-id.error';
import { Color } from '../models/color.model';

export const getColors: RequestHandler = catchAsync(async (_req, res): Promise<void> => {
  const colors = await Color.find();
  res.status(200).json(colors);
});

export const getColor: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const id = req.params['id'];
  if (!id) throw new InvalidIdError();
  const colors = await Color.findById(id);
  res.status(200).json(colors);
});

export const deleteColor: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const id = req.params['id'];
  if (!id) throw new InvalidIdError();
  await Color.findByIdAndDelete(id);
  res.status(204).send();
});

export const createColor: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const { name, code } = req.body;
  if (!name || !code) throw new Error('Invalid Name');
  const newColor = await Color.create({ name: name, code: code });
  res.status(200).json(newColor);
});

export const updateColor: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const id = req.params['id'];
  const { name, code } = req.body;
  if (!id || !name || !code) throw new Error('Invalid Data');
  const oldColor = await Color.findByIdAndUpdate(id, { name: name, code: code });
  res.status(200).json(oldColor);
});
