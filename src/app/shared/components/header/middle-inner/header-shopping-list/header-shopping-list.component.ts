import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartItem } from '../../../../models/cart-item.interface';
import { CartService } from '../../../../../cart/cart.service';
import { RouterLink } from '@angular/router';
import { NgForOf, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-header-shopping-list',
  templateUrl: './header-shopping-list.component.html',
  styleUrls: ['./header-shopping-list.component.scss'],
  standalone: true,
  imports: [RouterLink, NgForOf, NgOptimizedImage],
})
export class HeaderShoppingListComponent implements OnInit, OnDestroy {
  @Output() cartItemsCountChange = new EventEmitter<number>();

  public cartItems: CartItem[] = [];
  public totalAmount = 0;

  private subsciptions = new Subscription();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.subsciptions.add(
      this.cartService.getItems$().subscribe(cartItems => {
        this.cartItems = cartItems;
        this.cartItemsCountChange.emit(cartItems.length);
      }),
    );
    this.subsciptions.add(
      this.cartService.getTotalAmount$().subscribe(total => {
        this.totalAmount = total;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subsciptions.unsubscribe();
  }

  public removeItemFromCart(cartItem: CartItem) {
    this.cartService.removeItem(cartItem);
  }
}
