import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-total-amount',
  templateUrl: './cart-total-amount.component.html',
  styleUrls: ['./cart-total-amount.component.scss'],
  standalone: true,
  imports: [RouterLink],
})
export class CartTotalAmountComponent implements OnInit {
  public subtotal = 0;
  public shipping = 5;
  private subscription = new Subscription();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.cartService.getTotalAmount$().subscribe(total => {
        this.subtotal = total;
      }),
    );
  }
}
