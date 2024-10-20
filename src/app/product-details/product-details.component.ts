import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { Product } from '../shared/models/product.interface';
import { CartService } from '../cart/cart.service';
import { ProductDetailsService } from './product-details.service';
import { BreadcrumbsComponent } from '../shared/components/breadcrumbs/breadcrumbs.component';
import { DatePipe, NgClass, NgStyle } from '@angular/common';
import { ProductDetailsSidebarComponent } from './product-details-sidebar/product-details-sidebar.component';
import { ProductDetailsSocialLinksComponent } from './product-details-social-links/product-details-social-links.component';
import { Color } from '../shared/models/color.interface';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  standalone: true,
  imports: [
    BreadcrumbsComponent,
    DatePipe,
    ProductDetailsSidebarComponent,
    ProductDetailsSocialLinksComponent,
    NgStyle,
    NgClass,
  ],
})
export class ProductDetailsComponent implements OnInit {
  protected readonly imagesUrl = environment.imagesUrl + '/';

  public product: Product | undefined;
  public selectedColor = signal<Color | undefined>(undefined);

  constructor(
    private activatedRoute: ActivatedRoute,
    private productDetailsService: ProductDetailsService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap(paramsMap => {
          const id = paramsMap.get('id');
          if (!id) {
            return of(undefined);
          }
          return this.productDetailsService.getProductDetails(id);
        }),
      )
      .subscribe(product => {
        this.product = product;
        this.selectedColor.set(product?.colors[0]);
      });
  }

  public addToCart() {
    if (!this.product || !this.selectedColor()) return;
    this.cartService.addItem(this.product, this.selectedColor() as Color);
  }
}
