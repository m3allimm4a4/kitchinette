import { IEntity } from './entity.interface';
import { ICategory } from './category.interface';
import { IColor } from './color.interface';

export interface IProduct extends IEntity {
  name: string;
  price: number;
  imagePath: string;
  hoverImagePath: string;
  mainImagePath: string;
  description: string;
  trending: boolean;
  outOfStock: boolean;
  category: ICategory;
  colors: IColor[];
  oldPrice?: number;
}
