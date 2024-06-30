import { RequestHandler } from 'express';
import { catchAsync } from '../shared/catchAsync';
import { Order } from '../models/order.model';
import { InvalidIdError } from '../errors/invalid-id.error';
import { NotFoundError } from '../errors/not-found.error';
import { IOrder } from '../interfaces/order.interface';
import { sendEmail } from '../shared/mail-sender';
import { environment } from '../environments/environment';

export const getOrders: RequestHandler = catchAsync(async (_req, res): Promise<void> => {
  const orders = await Order.find().populate('user');
  res.status(200).json(orders.map(o => o.toObject()));
});

export const getOrder: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const id = req.params['id'];
  if (!id) throw new InvalidIdError();

  const order = await Order.findById(id).populate('user');
  if (!order) throw new NotFoundError();
  res.status(200).json(order.toObject());
});

export const createOrder: RequestHandler = catchAsync(async (req, res): Promise<void> => {
  const order: IOrder = req.body;
  if (!order) throw new Error('Invalid Data');
  if (!order.products) throw new Error('Cart is empty');

  const newOrder = await Order.create({
    user: order.user._id,
    total: order.total,
    subtotal: order.subtotal,
    discount: order.discount,
    products: order.products,
  });

  const newOrderObject = (await newOrder.populate('user')).toObject();

  res.render('order-details', newOrderObject, async (err, html) => {
    if (err) {
      console.error(err);
      res.status(500).send('Something went wrong. Try again later.');
      return;
    }
    await sendEmail('Order Confirmation', [order.user.email, environment.senderEmail], html);
    res.status(200).json(newOrderObject);
  });
});
