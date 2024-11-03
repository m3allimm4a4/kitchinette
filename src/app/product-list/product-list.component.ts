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
import { switchMap } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [
    BreadcrumbsComponent,
    ProductCardComponent,
    ProductListSidebarComponent,
    ProductListTopbarComponent,
    NgClass,
  ],
})
export class ProductListComponent implements OnInit {
  public productList: Product[] = [];
  public productListPage: Product[] = [];
  public pageNumbers: number[] = [];
  public currentPage: number = 0;
  public pageNumber: number = 0;
  public sortBy = SortBy.name;

  private pageSize = 25;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productListService: ProductListService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap
      .pipe(
        switchMap(paramMap => {
          const categoryId = paramMap.get(FilterBy.category) || undefined;
          const brandId = paramMap.get(FilterBy.brand) || undefined;
          const searchString = paramMap.get(FilterBy.search) || undefined;

          return this.productListService.getProductList(categoryId, brandId, searchString);
        }),
      )
      .subscribe(data => {
        this.productList = this.productListService.sortProductList(data, this.sortBy);
        this.pageNumbers = this.getPageNumbers(this.productList);
        this.productListPage = this.productListService.paginateProductList(this.productList, 0, this.pageSize);
      });
  }

  public onSortChange(sortBy: SortBy): void {
    this.sortBy = sortBy;
    this.currentPage = 0;
    this.productList = this.productListService.sortProductList(this.productList, sortBy);
    this.productListPage = this.productListService.paginateProductList(this.productList, 0, this.pageSize);
  }

  public onPageChange(pageNumber: number) {
    if (this.currentPage !== pageNumber && pageNumber >= 0 && pageNumber < this.pageNumber) {
      this.currentPage = pageNumber;
      this.productListPage = this.productListService.paginateProductList(this.productList, pageNumber, this.pageSize);
      window.scroll(0, 0);
    }
  }

  private getPageNumbers(products: Product[]): number[] {
    this.pageNumber = Math.ceil(products.length / this.pageSize);
    return new Array(this.pageNumber).fill(0).map((_, i) => i);
  }
}
