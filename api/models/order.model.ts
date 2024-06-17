import { model, Schema } from 'mongoose';
import { IOrder } from '../interfaces/order.interface';
import { ProductSchema } from './product.model';
import { User } from './user.model';

export const OrderSchema = new Schema<IOrder>(
  {
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    discount: { type: Number, required: true },
    products: [
      {
        quantity: { type: Number, required: true },
        product: ProductSchema,
      },
    ],
    user: { type: Schema.Types.ObjectId, ref: User },
  },
  { timestamps: true },
);

export const Order = model<IOrder>('Order', OrderSchema);
