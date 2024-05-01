import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../cart.service';
import { CartItem } from '../../shared/models/cart-item.interface';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.scss'],
  standalone: true,
  imports: [RouterLink, FormsModule],
})
export class CartTableComponent implements OnInit, OnDestroy {
  public cartItems: CartItem[] = [];

  private subscription = new Subscription();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getItems$().subscribe(items => {
      this.cartItems = items;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onQuantityChanged(event: number, cartItemIndex: number) {
    this.cartService.changeQuantity(event, cartItemIndex);
  }

  public removeItem(item: CartItem) {
    this.cartService.removeItem(item);
  }
}
