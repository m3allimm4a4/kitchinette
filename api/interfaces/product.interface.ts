import { IEntity } from './entity.interface';
import { ICategory } from './category.interface';

export interface IProduct extends IEntity {
  name: string;
  price: number;
  imagePath: string;
  hoverImagePath: string;
  mainImagePath: string;
  description: string;
  trending: boolean;
  category: ICategory;
  oldPrice?: number;
}
