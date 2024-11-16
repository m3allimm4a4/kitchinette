import { model, Schema } from 'mongoose';
import { ISlider } from '../interfaces/slider.interface';

export const SliderSchema = new Schema<ISlider>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    path: { type: String, required: true },
    link: { type: String, required: true },
  },
  { timestamps: true },
);

export const Slider = model<ISlider>('Slider', SliderSchema);
