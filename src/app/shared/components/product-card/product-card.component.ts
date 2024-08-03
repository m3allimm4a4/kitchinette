import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.interface';
import { CartService } from '../../../cart/cart.service';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
})
export class ProductCardComponent {
  @Input() product: Product = {} as Product;

  constructor(private cartService: CartService) {}

  public addToCart(): void {
    this.cartService.addItem(this.product, this.product.colors[0]);
  }
}
