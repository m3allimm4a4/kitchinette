import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product, ProductResponse } from '../shared/models/product.interface';
import { SortBy } from './models/sort-by.enum';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductListService {
  constructor(private http: HttpClient) {}

  public getProductList(
    categoryId?: number,
    brandId?: number,
    searchString?: string
  ): Observable<Product[]> {
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
    return this.http
      .get<ProductResponse[]>(`${environment.apiUrl}products`, { params: parameters })
      .pipe(
        map(products => {
          return products.map(product => {
            return {
              ...product,
              createdDate: new Date(product.createdDate),
            };
          });
        })
      );
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
}
