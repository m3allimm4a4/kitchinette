import { Category } from './category.interface';
import { Entity } from './entity.interface';
import { Color } from './color.interface';

export interface Product extends Entity {
  name: string;
  price: number;
  imagePath: string;
  hoverImagePath: string;
  mainImagePath: string;
  description: string;
  trending: boolean;
  outOfStock: boolean;
  category: Category;
  colors: Color[];
  oldPrice?: number;
}

export interface ProductCreate {
  name: string;
  price: number;
  oldPrice: number;
  description: string;
  mainImage: File;
  cardImage: File;
  cardHoverImage: File;
  trending: boolean;
  outOfStock: boolean;
  category: string;
  colors: string[];
}
