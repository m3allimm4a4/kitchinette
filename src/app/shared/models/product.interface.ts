import { Brand } from './brand.interface';
import { Category } from './category.interface';

export interface Product {
  id: number;
  name: string;
  cardImageUrl?: string;
  cardHoverImageUrl?: string;
  mainImageUrl?: string;
  price: number;
  oldPrice?: number;
  category: Category;
  brand: Brand;
  createdDate?: Date;
  description?: string;
}

export interface ProductResponse {
  id: number;
  name: string;
  cardImageUrl: string;
  cardHoverImageUrl: string;
  mainImageUrl: string;
  price: number;
  oldPrice: number;
  category: Category;
  brand: Brand;
  createdDate: string;
  description: string;
}

export interface ProductCreate {
  name: string;
  price: number;
  oldPrice: number;
  description: string;
  mainImage: File;
  cardImage: File;
  cardHoverImage: File;
  createdDate: number;
  trending: boolean;
  categoryId: number;
  brandId: number;
}
