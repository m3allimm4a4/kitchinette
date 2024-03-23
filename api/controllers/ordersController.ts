import { catchAsync } from 'api/shared/catchAsync';
import { prisma } from 'api/models/prismaClient';
import * as express from 'express';
import { Order } from 'src/app/shared/models/order.interface';

export const getOrders = catchAsync(async (req: express.Request, res: express.Response): Promise<void> => {
  const orders = await prisma.orders.findMany();
  res.status(200).json(orders);
});

export const getOrder = catchAsync(async (req: express.Request, res: express.Response): Promise<void> => {
  if (!req.params['id']) throw new Error('Missing Order ID');

  const order = await prisma.orders.findFirstOrThrow({
    include: {
      items: {
        include: {
          product: {
            include: {
              brand: {
                select: {
                  id: true,
                  name: true,
                },
              },
              category: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      },
    },
    where: {
      id: +req.params['id'],
    },
  });
  res.status(200).json(order);
});

export const createOrder = catchAsync(async (req: express.Request, res: express.Response): Promise<void> => {
  const order: Order = req.body;
  if (!order) throw new Error('Invalid Data');
  if (!order.items) throw new Error('Cart is empty');

  const newOrder = await prisma.orders.create({
    data: {
      firstName: order.firstName,
      lastName: order.lastName,
      total: order.total,
      subtotal: order.subtotal,
      discount: order.discount,
      email: order.email,
      phone: order.phone,
      address1: order.address1,
      address2: order.address2,
      city: order.city,
      items: {
        createMany: {
          data: order.items.map(item => {
            return {
              quantity: item.quantity,
              productId: item.product.id,
              unitPrice: item.product.price,
            };
          }),
        },
      },
    },
  });
  res.status(200).json(newOrder);
});
