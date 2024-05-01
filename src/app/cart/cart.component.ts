import { Component } from '@angular/core';
import { CartTableComponent } from './cart-table/cart-table.component';
import { CartTotalAmountComponent } from './cart-total-amount/cart-total-amount.component';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: true,
  imports: [CartTableComponent, CartTotalAmountComponent],
})
export class CartComponent {}
