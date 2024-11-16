import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartItem } from '../../../../models/cart-item.interface';
import { CartService } from '../../../../../cart/cart.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../../auth/auth.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-header-shopping-list',
  templateUrl: './header-shopping-list.component.html',
  styleUrls: ['./header-shopping-list.component.scss'],
  standalone: true,
  imports: [RouterLink],
})
export class HeaderShoppingListComponent implements OnInit, OnDestroy {
  @Output() cartItemsCountChange = new EventEmitter<number>();

  public baseUrl = environment.imagesUrl + '/';
  public cartItems: CartItem[] = [];
  public totalAmount = 0;
  public isUserLoggedIn = false;

  private subsciptions = new Subscription();

  constructor(
    private cartService: CartService,
    private authService: AuthService,
  ) {}

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
    this.subsciptions.add(
      this.authService.isUserLoggedIn$().subscribe(isUserLoggedIn => (this.isUserLoggedIn = isUserLoggedIn)),
    );
  }

  ngOnDestroy(): void {
    this.subsciptions.unsubscribe();
  }

  public removeItemFromCart(cartItem: CartItem) {
    this.cartService.removeItem(cartItem);
  }
}
