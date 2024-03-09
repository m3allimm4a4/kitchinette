import { IEntity } from './entity.interface';

export interface ISlider extends IEntity {
  title: string;
  subtitle: string;
  description: string;
  path: string;
  link: string;
}
