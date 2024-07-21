import { IEntity } from './entity.interface';
import { IUser } from './user.interface';
import { IProduct } from './product.interface';
import { IColor } from './color.interface';

export interface IOrder extends IEntity {
  user: IUser;
  subtotal: number;
  total: number;
  discount: number;
  products: IOrderProduct[];
}

export interface IOrderProduct {
  product: IProduct;
  quantity: number;
  color: IColor;
}
