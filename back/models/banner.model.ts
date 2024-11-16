import { model, Schema } from 'mongoose';
import { IBanner } from '../interfaces/banner.interface';

export const BannerSchema = new Schema<IBanner>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    path: { type: String, required: true },
    link: { type: String, required: true },
  },
  { timestamps: true },
);

export const Banner = model<IBanner>('Banner', BannerSchema);
