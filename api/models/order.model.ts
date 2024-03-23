import { model, Schema } from 'mongoose';
import { IOrder } from '../interfaces/order.interface';
import { ProductSchema } from './product.model';

export const OrderSchema = new Schema<IOrder>({
  subtotal: { type: Number, required: true },
  total: { type: Number, required: true },
  discount: { type: Number, required: true },
  products: [
    {
      quantity: { type: Number, required: true },
      product: ProductSchema,
    },
  ],
});

export const Order = model<IOrder>('Order', OrderSchema);
