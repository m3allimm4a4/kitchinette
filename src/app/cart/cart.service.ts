import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CartItem } from '../shared/models/cart-item.interface';
import { Product } from '../shared/models/product.interface';
import { Color } from '../shared/models/color.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly cartKey = 'cart';
  private cartItems$ = new BehaviorSubject<CartItem[]>([]);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const json = localStorage.getItem(this.cartKey);
      if (json) {
        const data: CartItem[] = JSON.parse(json);
        this.updateCart(data);
      }
    }
  }

  public getItems$(): Observable<CartItem[]> {
    return this.cartItems$.asObservable();
  }

  public getItems(): CartItem[] {
    return this.cartItems$.value;
  }

  public getTotalAmount$(): Observable<number> {
    return this.cartItems$.pipe(
      map(cartItems => {
        return cartItems.reduce((sum, currentCartItem) => {
          return sum + currentCartItem.quantity * currentCartItem.product.price;
        }, 0);
      }),
    );
  }

  public getTotalAmount(): number {
    return this.cartItems$.value.reduce((sum, currentCartItem) => {
      return sum + currentCartItem.quantity * currentCartItem.product.price;
    }, 0);
  }

  public addItem(product: Product, color: Color): void {
    const cartItems = this.cartItems$.value;
    const item = cartItems.find(p => p.product._id === product._id && p.color._id === color._id);
    if (item) {
      item.quantity++;
    } else {
      cartItems.push({ product: product, color: color, quantity: 1 });
    }
    this.updateCart(cartItems);
  }

  public changeQuantity(quantity: number, index: number): void {
    const items = this.cartItems$.value;
    items[index].quantity = quantity;
    this.updateCart(items);
  }

  public removeItem(item: CartItem): void {
    const cartItems = this.cartItems$.value;
    const index = cartItems.findIndex(p => p.product._id === item.product._id);
    if (index === -1) return;

    cartItems.splice(index, 1);
    this.updateCart(cartItems);
  }

  public clearCart(): void {
    this.updateCart([]);
  }

  private updateCart(items: CartItem[]): void {
    if (isPlatformBrowser(this.platformId)) {
      this.cartItems$.next(items);
      items.length ? localStorage.setItem(this.cartKey, JSON.stringify(items)) : localStorage.removeItem(this.cartKey);
    }
  }
}
