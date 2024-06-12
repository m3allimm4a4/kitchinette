import { RequestHandler } from 'express';
import { catchAsync } from '../shared/catchAsync';
import { Product } from '../models/product.model';
import { InvalidIdError } from '../errors/invalid-id.error';
import { NotFoundError } from '../errors/not-found.error';
import { UploadedFile } from 'express-fileupload';
import { deleteImageFile, getImageName, saveUploadedFile } from '../shared/helpers';

export const getProducts: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  let query = Product.find();
  if (req.query['category']) {
    query = query.find({ category: { _id: req.query['category'] } });
  }
  if (req.query['search']) {
    query = query.find({ name: { $regex: req.query['search'] } });
  }
  if (req.query['trending']) {
    query = query.find({ trending: req.query['trending'] });
  }
  if (req.query['newProducts']) {
    query = query.sort({ createdAt: 'desc' }).limit(3);
  }

  const products = await query.populate('category');
  res.status(200).json(products);
});

export const getProduct: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const id = req.params['id'];
  if (!id) throw new InvalidIdError();
  const product = await Product.findById(id).populate('category');
  if (!product) throw new NotFoundError();
  res.status(200).json(product);
});

export const deleteProducts: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const id = req.params['id'];
  if (!id) throw new InvalidIdError();

  await Product.findByIdAndDelete(id);
  res.status(204).send();
});

export const createProduct: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  if (!req.files) throw new Error('Images are missing images');
  if (Object.keys(req.files).length < 3) throw new Error('Some images are missing');

  const mainImage = req.files['mainImage'] as UploadedFile;
  const cardImage = req.files['cardImage'] as UploadedFile;
  const cardHoverImage = req.files['cardHoverImage'] as UploadedFile;

  const [mainImageName, cardImageName, cardHoverImageName] = await Promise.all([
    saveUploadedFile(mainImage),
    saveUploadedFile(cardImage),
    saveUploadedFile(cardHoverImage),
  ]);

  try {
    const newProduct = await Product.create({
      name: req.body.name,
      price: +req.body.price,
      oldPrice: +req.body.oldPrice,
      imagePath: mainImageName,
      mainImagePath: cardImageName,
      hoverImagePath: cardHoverImageName,
      description: req.body.description,
      trending: req.body.trending === 'true',
      category: req.body.category,
    });
    res.status(200).json(newProduct);
  } catch (error) {
    await Promise.all([
      deleteImageFile(mainImageName),
      deleteImageFile(cardImageName),
      deleteImageFile(cardHoverImageName),
    ]);
    throw error;
  }
});

export const updateProduct: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const id = req.params['id'];
  if (!id) throw new InvalidIdError();
  if (!req.files) throw new Error('Images are missing images');
  if (Object.keys(req.files).length < 3) throw new Error('Some images are missing');

  const product = await Product.findById(id);
  if (!product) throw new NotFoundError();

  await Promise.all([
    deleteImageFile(getImageName(product.imagePath)),
    deleteImageFile(getImageName(product.mainImagePath)),
    deleteImageFile(getImageName(product.hoverImagePath)),
  ]);

  const mainImage = req.files['mainImage'] as UploadedFile;
  const cardImage = req.files['cardImage'] as UploadedFile;
  const cardHoverImage = req.files['cardHoverImage'] as UploadedFile;

  const [mainImageName, cardImageName, cardHoverImageName] = await Promise.all([
    saveUploadedFile(mainImage),
    saveUploadedFile(cardImage),
    saveUploadedFile(cardHoverImage),
  ]);

  try {
    product.name = req.body.name;
    product.price = +req.body.price;
    product.imagePath = mainImageName;
    product.mainImagePath = cardImageName;
    product.hoverImagePath = cardHoverImageName;
    product.description = req.body.description;
    product.trending = req.body.trending;
    product.category = req.body.category;
    const oldProduct = await product.save();
    res.status(200).json(oldProduct);
  } catch (error) {
    await Promise.all([
      deleteImageFile(mainImageName),
      deleteImageFile(cardImageName),
      deleteImageFile(cardHoverImageName),
    ]);
    throw error;
  }
});
