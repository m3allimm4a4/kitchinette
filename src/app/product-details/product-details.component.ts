import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from '../shared/models/product.interface';
import { CartService } from '../cart/cart.service';
import { ProductDetailsService } from './product-details.service';
import { BreadcrumbsComponent } from '../shared/components/breadcrumbs/breadcrumbs.component';
import { DatePipe } from '@angular/common';
import { ProductDetailsSidebarComponent } from './product-details-sidebar/product-details-sidebar.component';
import {
  ProductDetailsSocialLinksComponent
} from './product-details-social-links/product-details-social-links.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  standalone: true,
  imports: [BreadcrumbsComponent, DatePipe, ProductDetailsSidebarComponent, ProductDetailsSocialLinksComponent],
})
export class ProductDetailsComponent implements OnInit {
  public product: Product = {} as Product;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productDetailsService: ProductDetailsService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap(paramsMap => {
          const id = Number(paramsMap.get('id'));
          return this.productDetailsService.getProductDetails(id);
        }),
      )
      .subscribe(product => {
        this.product = product;
      });
  }

  public addToCart() {
    this.cartService.addItem(this.product);
  }
}
