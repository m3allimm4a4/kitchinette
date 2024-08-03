import { Product } from './product.interface';
import { Color } from './color.interface';

export interface CartItem {
  product: Product;
  quantity: number;
  color: Color;
}
