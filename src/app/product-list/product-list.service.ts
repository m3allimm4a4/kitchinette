import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../shared/models/product.interface';
import { SortBy } from './models/sort-by.enum';

@Injectable({
  providedIn: 'root',
})
export class ProductListService {
  constructor(private http: HttpClient) {}

  public getProductList(categoryId?: string, brandId?: string, searchString?: string): Observable<Product[]> {
    let parameters = {};
    if (categoryId) {
      parameters = { category: categoryId };
    }
    if (brandId) {
      parameters = { ...parameters, brand: brandId };
    }
    if (searchString) {
      parameters = { ...parameters, search: searchString };
    }
    return this.http.get<Product[]>('/products', { params: parameters });
  }

  public sortProductList(productList: Product[], sortBy: SortBy): Product[] {
    const products = [...productList];
    switch (sortBy) {
      case SortBy.name:
        products.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        break;
      case SortBy.price:
        products.sort((a, b) => {
          if (a.price < b.price) {
            return -1;
          }
          if (a.price > b.price) {
            return 1;
          }
          return 0;
        });
        break;
    }
    return products;
  }

  public paginateProductList(productList: Product[], pageNumber: number, pageSize: number): Product[] {
    const start = pageNumber * pageSize
    return productList.slice(start, start + pageSize);
  }
}
