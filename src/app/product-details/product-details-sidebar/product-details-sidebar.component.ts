import { Component, OnInit } from '@angular/core';
import { ProductDetailsService } from '../product-details.service';
import { Product } from '../../shared/models/product.interface';
import { Category } from '../../shared/models/category.interface';
import { InitializationService } from '../../shared/services/initialization/initialization.service';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product-details-sidebar',
  templateUrl: './product-details-sidebar.component.html',
  styleUrls: ['./product-details-sidebar.component.scss'],
  standalone: true,
  imports: [RouterLink, DatePipe],
})
export class ProductDetailsSidebarComponent implements OnInit {
  public newProducts: Product[] = [];
  public categories: Category[] = [];

  constructor(
    private initializationService: InitializationService,
    private productDetailsService: ProductDetailsService,
  ) {}

  ngOnInit(): void {
    this.initializationService.getAllCategories().subscribe(categories => (this.categories = categories.slice(0, 5)));

    this.productDetailsService.getNewProducts().subscribe(products => {
      this.newProducts = products;
    });
  }
}
