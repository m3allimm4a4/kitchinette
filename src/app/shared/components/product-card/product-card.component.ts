import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.interface';
import { CartService } from '../../../cart/cart.service';
import { RouterLink } from '@angular/router';
import { NgClass, NgStyle } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
  imports: [RouterLink, NgStyle, NgClass],
})
export class ProductCardComponent {
  protected readonly imagesUrl = environment.imagesUrl + '/';

  @Input() product: Product = {} as Product;

  constructor(private cartService: CartService) {}

  public addToCart(): void {
    this.cartService.addItem(this.product, this.product.colors[0]);
  }
}
