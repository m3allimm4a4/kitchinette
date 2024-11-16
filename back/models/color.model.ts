import { model, Schema } from 'mongoose';
import { IColor } from '../interfaces/color.interface';

export const ColorSchema = new Schema<IColor>(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
  },
  { timestamps: true },
);

export const Color = model<IColor>('Color', ColorSchema);
