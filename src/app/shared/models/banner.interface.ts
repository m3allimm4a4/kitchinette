import { Entity } from './entity.interface';

export interface Banner extends Entity {
  title: string;
  subtitle: string;
  path: string;
  link: string;
  imageFile?: File;
}
