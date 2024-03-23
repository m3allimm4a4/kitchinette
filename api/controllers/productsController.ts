import { prisma } from 'api/models/prismaClient';
import { PrismaFindAllQuery } from 'api/models/prismaFindAllQuery.interface';
import { catchAsync } from 'api/shared/catchAsync';
import { deleteImageFile, getImageName, saveUploadedFile } from 'api/shared/helpers';
import { environment } from 'environment/environment';
import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { join } from 'path';

export const getProducts = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const query: PrismaFindAllQuery = {};
  if (req.query['category']) {
    query.where = {
      ...query.where,
      categoryId: { equals: +req.query['category'] },
    };
  }
  if (req.query['brand']) {
    query.where = {
      ...query.where,
      brandId: { equals: +req.query['brand'] },
    };
  }
  if (req.query['search']) {
    query.where = {
      ...query.where,
      name: { contains: req.query['search'] },
    };
  }
  if (req.query['trending']) {
    query.where = {
      ...query.where,
      trending: Boolean(+req.query['trending']),
    };
  }
  if (req.query['newProducts']) {
    query.orderBy = { createdDate: 'desc' };
    query.take = 3;
  }

  const products = await prisma.products.findMany({
    include: {
      category: { select: { id: true, name: true } },
      brand: { select: { id: true, name: true } },
    },
    ...query,
  });
  res.status(200).json(products);
});

export const getProduct = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const id = +req.params['id'];
  if (!id) throw new Error('You must provide a product ID');
  const product = await prisma.products.findFirstOrThrow({
    include: {
      category: { select: { id: true, name: true } },
      brand: { select: { id: true, name: true } },
    },
    where: {
      id: id,
    },
  });
  res.status(200).json(product);
});

export const deleteProducts = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const id = +req.params['id'];
  if (!id) throw new Error('You must provide a product ID');

  await prisma.products.delete({
    where: {
      id: id,
    },
  });
  res.status(200).json(null);
});

export const createProduct = catchAsync(async (req: Request, res: Response): Promise<void> => {
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
    await prisma.products.create({
      data: {
        name: req.body.name,
        price: +req.body.price,
        oldPrice: +req.body.oldPrice,
        mainImageUrl: join(environment.imagesLocation, mainImageName),
        cardImageUrl: join(environment.imagesLocation, cardImageName),
        cardHoverImageUrl: join(environment.imagesLocation, cardHoverImageName),
        description: req.body.description,
        trending: Boolean(req.body.trending),
        category: {
          connect: {
            id: +req.body.categoryId,
          },
        },
        brand: {
          connect: {
            id: +req.body.brandId,
          },
        },
        createdDate: new Date(),
      },
    });
  } catch (error) {
    await Promise.all([
      deleteImageFile(mainImageName),
      deleteImageFile(cardImageName),
      deleteImageFile(cardHoverImageName),
    ]);
    throw error;
  }
  res.status(200).json(null);
});

export const updateProduct = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const id = +req.params['id'];
  if (!id) throw new Error('You must provide a product ID');
  if (!req.files) throw new Error('Images are missing images');
  if (Object.keys(req.files).length < 3) throw new Error('Some images are missing');

  const product = await prisma.products.findFirstOrThrow({
    where: {
      id: id,
    },
  });

  await Promise.all([
    deleteImageFile(getImageName(product.mainImageUrl)),
    deleteImageFile(getImageName(product.cardImageUrl)),
    deleteImageFile(getImageName(product.cardHoverImageUrl)),
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
    await prisma.products.update({
      where: {
        id: id,
      },
      data: {
        name: req.body.name,
        price: +req.body.price,
        oldPrice: +req.body.oldPrice,
        mainImageUrl: join(environment.imagesLocation, mainImageName),
        cardImageUrl: join(environment.imagesLocation, cardImageName),
        cardHoverImageUrl: join(environment.imagesLocation, cardHoverImageName),
        description: req.body.description,
        trending: Boolean(req.body.trending),
        category: {
          connect: {
            id: +req.body.categoryId,
          },
        },
        brand: {
          connect: {
            id: +req.body.brandId,
          },
        },
      },
    });
  } catch (error) {
    await Promise.all([
      deleteImageFile(mainImageName),
      deleteImageFile(cardImageName),
      deleteImageFile(cardHoverImageName),
    ]);
    throw error;
  }

  res.status(200).json(null);
});
