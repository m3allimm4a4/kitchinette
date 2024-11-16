import path from 'node:path';
import { RequestHandler } from 'express';
import { catchAsync } from '../shared/catchAsync';
import { Product } from '../models/product.model';
import { InvalidIdError } from '../errors/invalid-id.error';
import { NotFoundError } from '../errors/not-found.error';
import { UploadedFile } from 'express-fileupload';
import { deleteObject, putObject } from '../clients/object-storage.client';

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

  const products = await query.populate('category').populate('colors');
  res.status(200).json(products.map(o => o.toObject()));
});

export const getProduct: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const id = req.params['id'];
  if (!id) throw new InvalidIdError();
  const product = await Product.findById(id).populate('category').populate('colors');
  if (!product) throw new NotFoundError();
  res.status(200).json(product);
});

export const deleteProducts: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const id = req.params['id'];
  if (!id) throw new InvalidIdError();

  const product = await Product.findById(id);
  if (!product) throw new NotFoundError();

  await Promise.all([
    deleteObject(product.imagePath),
    deleteObject(product.mainImagePath),
    deleteObject(product.hoverImagePath),
  ]);

  await Product.findByIdAndDelete(id);
  res.status(204).send();
});

export const createProduct: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  if (!req.files) throw new Error('Images are missing images');
  if (Object.keys(req.files).length < 3) throw new Error('Some images are missing');

  const newProduct = await Product.create({
    name: req.body.name,
    price: +req.body.price,
    oldPrice: +req.body.oldPrice,
    imagePath: ' ',
    mainImagePath: ' ',
    hoverImagePath: ' ',
    description: req.body.description,
    trending: req.body.trending === 'true',
    outOfStock: req.body.outOfStock === 'true',
    category: req.body.category,
    colors: JSON.parse(req.body.colors),
  });

  const mainImage = req.files['mainImage'] as UploadedFile;
  const mainImagePath = `products/${newProduct._id}-main${path.extname(mainImage.name)}`;
  newProduct.imagePath = mainImagePath;

  const cardImage = req.files['cardImage'] as UploadedFile;
  const cardImagePath = `products/${newProduct._id}-card${path.extname(mainImage.name)}`;
  newProduct.mainImagePath = cardImagePath;

  const cardHoverImage = req.files['cardHoverImage'] as UploadedFile;
  const cardHoverImagePath = `products/${newProduct._id}-card-hover${path.extname(mainImage.name)}`;
  newProduct.hoverImagePath = cardHoverImagePath;

  await Promise.all([
    putObject(mainImage.data, mainImagePath, 'public-read'),
    putObject(cardImage.data, cardImagePath, 'public-read'),
    putObject(cardHoverImage.data, cardHoverImagePath, 'public-read'),
  ]);

  await newProduct.save();

  res.status(200).json(newProduct);
});

export const updateProduct: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const id = req.params['id'];
  if (!id) throw new InvalidIdError();

  let product = await Product.findById(id);
  if (!product) throw new NotFoundError();

  product.name = req.body.name;
  product.price = +req.body.price;
  product.description = req.body.description;
  product.trending = req.body.trending === 'true';
  product.outOfStock = req.body.outOfStock === 'true';
  product.category = req.body.category;
  product.colors = JSON.parse(req.body.colors);
  product = await product.save();

  if (req.files) {
    const mainImage = req.files['mainImage'] as UploadedFile;
    const cardImage = req.files['cardImage'] as UploadedFile;
    const cardHoverImage = req.files['cardHoverImage'] as UploadedFile;

    if (mainImage) {
      const mainImagePath = `products/${product._id}-main${path.extname(mainImage.name)}`;
      const oldMainImagePath = product.imagePath;
      await deleteObject(oldMainImagePath);
      await putObject(mainImage.data, mainImagePath, 'public-read');
      product.imagePath = mainImagePath;
    }
    if (cardImage) {
      const cardImagePath = `products/${product._id}-card${path.extname(mainImage.name)}`;
      const oldCardImagePath = product.mainImagePath;
      await deleteObject(oldCardImagePath);
      await putObject(cardImage.data, cardImagePath, 'public-read');
      product.mainImagePath = cardImagePath;
    }
    if (cardHoverImage) {
      const cardHoverImagePath = `products/${product._id}-card-hover${path.extname(mainImage.name)}`;
      const oldHoverImagePath = product.hoverImagePath;
      await deleteObject(oldHoverImagePath);
      await putObject(cardImage.data, cardHoverImagePath, 'public-read');
      product.hoverImagePath = cardHoverImagePath;
    }
    product = await product.save();
  }
  res.status(200).json(product.toObject());
});
