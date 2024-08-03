import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../cart.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-cart-total-amount',
  templateUrl: './cart-total-amount.component.html',
  styleUrls: ['./cart-total-amount.component.scss'],
  standalone: true,
  imports: [RouterLink],
})
export class CartTotalAmountComponent implements OnInit {
  public subtotal = 0;
  public shipping = 4;
  public isUserLoggedIn = false;
  private subscription = new Subscription();

  constructor(
    private cartService: CartService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.cartService.getTotalAmount$().subscribe(total => {
        this.subtotal = total;
      }),
    );
    this.subscription.add(
      this.authService.isUserLoggedIn$().subscribe(isUserLoggedIn => (this.isUserLoggedIn = isUserLoggedIn)),
    );
  }
}
