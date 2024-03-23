import { RequestHandler } from 'express';
import { catchAsync } from '../shared/catchAsync';
import { Slider } from '../models/slider.model';
import { InvalidIdError } from '../errors/invalid-id.error';
import { deleteImageFile, getImageName, saveUploadedFile } from '../shared/helpers';
import { NotFoundError } from '../errors/not-found.error';
import { UploadedFile } from 'express-fileupload';
import { environment } from '../environments/environment';
import { join } from 'node:path';

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
  if (!slider) throw new NotFoundError();

  await deleteImageFile(getImageName(slider.path));

  const image = req.files['imageFile'] as UploadedFile;
  const imageName = await saveUploadedFile(image);
  try {
    slider.title = req.body.title;
    slider.subtitle = req.body.subtitle;
    slider.description = req.body.description;
    slider.path = join(environment.imagesPath, imageName);
    const newSlider = await slider.save();
    res.status(200).json(newSlider);
  } catch (error) {
    await deleteImageFile(imageName);
    throw error;
  }
});
