import { RequestHandler } from 'express';
import { catchAsync } from '../shared/catchAsync';
import { Slider } from '../models/slider.model';
import { InvalidIdError } from '../errors/invalid-id.error';
import { NotFoundError } from '../errors/not-found.error';
import { UploadedFile } from 'express-fileupload';
import path from 'node:path';
import { deleteObject, putObject } from '../clients/object-storage.client';

export const getSlider: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const sliders = await Slider.find();
  res.status(200).json(sliders);
});

export const updateSlider: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const id = req.params['id'];
  if (!id) throw new InvalidIdError();
  if (!req.files) throw new Error('Images are missing images');
  if (Object.keys(req.files).length < 1) throw new Error('Some images are missing');

  const slider = await Slider.findById(id);
  if (!slider) {
    throw new NotFoundError();
  }

  const image = req.files['imageFile'] as UploadedFile;
  const imagePath = `sliders/${slider._id}${path.extname(image.name)}`;
  const oldImagePath = slider.path;

  slider.title = req.body.title;
  slider.subtitle = req.body.subtitle;
  slider.description = req.body.description;
  slider.path = imagePath;
  await slider.save();

  await deleteObject(oldImagePath);
  await putObject(image.data, imagePath, 'public-read');

  res.status(200).json(slider);
});
