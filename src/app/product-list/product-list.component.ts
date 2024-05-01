import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../shared/models/product.interface';
import { FilterBy } from './models/filter-by.enum';
import { SortBy } from './models/sort-by.enum';
import { ProductListService } from './product-list.service';
import { BreadcrumbsComponent } from '../shared/components/breadcrumbs/breadcrumbs.component';
import { ProductCardComponent } from '../shared/components/product-card/product-card.component';
import { ProductListSidebarComponent } from './product-list-sidebar/product-list-sidebar.component';
import { ProductListTopbarComponent } from './product-list-topbar/product-list-topbar.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [BreadcrumbsComponent, ProductCardComponent, ProductListSidebarComponent, ProductListTopbarComponent],
})
export class ProductListComponent implements OnInit {
  public productList: Product[] = [];
  public sortBy = SortBy.name;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productListService: ProductListService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(paramMap => {
      const categoryId = Number(paramMap.get(FilterBy.category));
      const brandId = Number(paramMap.get(FilterBy.brand));
      const searchString = paramMap.get(FilterBy.search) || '';

      this.productListService.getProductList(categoryId, brandId, searchString).subscribe(data => {
        this.productList = data;
        this.productList = this.productListService.sortProductList(this.productList, this.sortBy);
      });
    });
  }

  public onSortChange(sortBy: SortBy): void {
    this.sortBy = sortBy;
    this.productList = this.productListService.sortProductList(this.productList, sortBy);
  }
}
