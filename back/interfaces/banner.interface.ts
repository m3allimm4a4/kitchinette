import { IEntity } from './entity.interface';

export interface IBanner extends IEntity {
  title: string;
  subtitle: string;
  path: string;
  link: string;
}
