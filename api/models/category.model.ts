import { model, Schema } from 'mongoose';
import { ICategory } from '../interfaces/category.interface';

export const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
  },
  { timestamps: true },
);

export const Category = model<ICategory>('Category', CategorySchema);
