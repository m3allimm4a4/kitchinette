import { catchAsync } from 'api/shared/catchAsync';
import { prisma } from 'api/models/prismaClient';
import * as express from 'express';
import { deleteImageFile, getImageName, saveUploadedFile } from 'api/shared/helpers';
import { UploadedFile } from 'express-fileupload';
import { environment } from 'environment/environment';
import { join } from 'path';

export const getSlider = catchAsync(async (req: express.Request, res: express.Response): Promise<void> => {
  const sliderItems = await prisma.slider.findMany();
  res.status(200).json(sliderItems);
});

export const updateSlider = catchAsync(async (req: express.Request, res: express.Response): Promise<void> => {
  const id = +req.params['id'];
  if (!id) throw new Error('Invalid ID');
  if (!req.files) throw new Error('Images are missing images');
  if (Object.keys(req.files).length < 1) throw new Error('Some images are missing');

  const slider = await prisma.slider.findFirstOrThrow({
    where: {
      id: id,
    },
  });

  await deleteImageFile(getImageName(slider.imageUrl));

  const image = req.files['imageFile'] as UploadedFile;
  const imageName = await saveUploadedFile(image);
  try {
    const newSlider = await prisma.slider.update({
      data: {
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        url: req.body.url,
        imageUrl: join(environment.imagesLocation, imageName),
      },
      where: {
        id: id,
      },
    });
    res.status(200).json(newSlider);
  } catch (error) {
    await deleteImageFile(imageName);
    throw error;
  }
});
