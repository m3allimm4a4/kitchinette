import { Entity } from './entity.interface';

export interface Slider extends Entity {
  title: string;
  subtitle: string;
  description: string;
  path: string;
  link: string;
  imageFile?: File;
}
