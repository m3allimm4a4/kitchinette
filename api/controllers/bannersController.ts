import express from 'express';
import { deleteImageFile, getImageName, saveUploadedFile } from '../shared/helpers';
import { UploadedFile } from 'express-fileupload';
import { join } from 'path';
import { environment } from '../environments/environment';
import { Banner } from '../models/banner.model';

export const getBanners = async (_: express.Request, res: express.Response): Promise<void> => {
  const banners = await Banner.find();
  res.status(200).json(banners);
};

export const updateBanner = async (req: express.Request, res: express.Response): Promise<void> => {
  const id = req.params['id'];
  if (!id) throw new Error('Invalid ID');
  if (!req.files) throw new Error('Images are missing images');
  if (Object.keys(req.files).length < 1) throw new Error('Some images are missing');

  const banner = await Banner.findById(id);
  if (!banner) throw new Error('Banner not found');

  await deleteImageFile(getImageName(banner.path));

  const image = req.files['imageFile'] as UploadedFile;
  const imageName = await saveUploadedFile(image);
  try {
    const newBanner = await Banner.findByIdAndUpdate(id, {
      title: req.body.title,
      subtitle: req.body.subtitle,
      url: req.body.url,
      imageUrl: join(environment.imagesPath, imageName),
    });
    res.status(200).json(newBanner);
  } catch (error) {
    await deleteImageFile(imageName);
    throw error;
  }
};
