import { model, Schema, Types } from 'mongoose';
import { IProduct } from '../interfaces/product.interface';
import { Category } from './category.model';

export const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imagePath: { type: String, required: true },
    hoverImagePath: { type: String, required: true },
    mainImagePath: { type: String, required: true },
    trending: { type: Boolean, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    category: { type: Types.ObjectId, ref: Category },
  },
  { timestamps: true },
);

export const Product = model<IProduct>('Product', ProductSchema);
