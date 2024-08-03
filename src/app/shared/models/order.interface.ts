import { Entity } from './entity.interface';
import { User } from './user.interface';
import { Product } from './product.interface';
import { Color } from './color.interface';

export interface Order extends Entity {
  user: User;
  subtotal: number;
  total: number;
  discount: number;
  products: OrderProduct[];
}

export interface OrderProduct {
  product: Product;
  quantity: number;
  color: Color;
}
