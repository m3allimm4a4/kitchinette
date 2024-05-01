import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.interface';
import { CartService } from '../../../cart/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
  imports: [RouterLink],
})
export class ProductCardComponent {
  @Input() product: Product = {} as Product;

  constructor(private cartService: CartService) {}

  public addToCart(): void {
    this.cartService.addItem(this.product);
  }
}
