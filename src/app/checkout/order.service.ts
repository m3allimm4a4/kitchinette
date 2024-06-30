import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../cart/cart.service';
import { Order } from '../shared/models/order.interface';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private authService: AuthService,
  ) {}

  public placeOrder(): Observable<Order> {
    const user = this.authService.getUser();
    if (!user) {
      throw new Error('User not logged in');
    }
    const subtotal = this.cartService.getTotalAmount();
    const discount = 0;
    const shipping = 4
    const newOrder: Order = {
      _id: '',
      subtotal: subtotal,
      total: subtotal - discount + shipping,
      discount: discount,
      products: this.cartService.getItems(),
      user: user,
    };
    return this.http.post<Order>('/orders', newOrder);
  }

  public getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('/orders');
  }

  public getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`/orders/${orderId}`);
  }
}
