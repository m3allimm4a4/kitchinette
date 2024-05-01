import { CartItem } from './cart-item.interface';

export interface Order {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  address1: string;
  address2: string;
  subtotal: number;
  discount: number;
  total: number;
  createdDate: Date;
  items?: CartItem[];
}

export interface OrderResponse {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  address1: string;
  address2: string;
  subtotal: number;
  discount: number;
  total: number;
  createdDate: number;
  items?: CartItem[];
}
