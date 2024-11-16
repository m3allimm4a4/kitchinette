import path from 'node:path';
import { RequestHandler } from 'express';
import { UploadedFile } from 'express-fileupload';
import { Banner } from '../models/banner.model';
import { NotFoundError } from '../errors/not-found.error';
import { catchAsync } from '../shared/catchAsync';
import { InvalidIdError } from '../errors/invalid-id.error';
import { deleteObject, putObject } from '../clients/object-storage.client';

export const getBanners: RequestHandler = catchAsync(async (_req, res): Promise<void> => {
  const banners = await Banner.find();
  res.status(200).json(banners);
});

export const getBanner: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const id = req.params['id'];
  if (!id) throw new InvalidIdError();
  const banner = await Banner.findById(id);
  if (!banner) throw new NotFoundError();
  res.status(200).json(banner);
});

export const updateBanner: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const id = req.params['id'];
  if (!id) throw new Error('Invalid ID');
  if (!req.files) throw new Error('Images are missing images');
  if (Object.keys(req.files).length < 1) throw new Error('Some images are missing');

  const banner = await Banner.findById(id);
  if (!banner) {
    throw new NotFoundError();
  }

  const image = req.files['imageFile'] as UploadedFile;
  const imagePath = `banners/${banner._id}${path.extname(image.name)}`;
  const oldImagePath = banner.path;

  banner.title = req.body.title;
  banner.subtitle = req.body.subtitle;
  banner.link = req.body.link;
  banner.path = imagePath;
  await banner.save();

  await deleteObject(oldImagePath);
  await putObject(image.data, imagePath, 'public-read');

  res.status(200).json(banner);
});

export const createBanner: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const newBanner = await Banner.create({
    title: req.body.title,
    subtitle: req.body.subtitle,
    link: req.body.link,
    path: req.body.path,
  });
  res.status(200).json(newBanner);
});
