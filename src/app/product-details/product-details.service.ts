import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iif, Observable } from 'rxjs';
import { Product, ProductCreate } from '../shared/models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  constructor(private http: HttpClient) {}

  public getProductDetails(productId: string): Observable<Product> {
    return this.http.get<Product>(`/products/${productId}`);
  }

  public getNewProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`/products`, { params: { newProducts: 1 } });
  }

  public createOrUpdateProduct(product: ProductCreate, id?: string): Observable<void> {
    const formData = new FormData();
    formData.set('name', product.name);
    formData.set('price', product.price.toString());
    formData.set('oldPrice', product.oldPrice.toString());
    formData.set('description', product.description);
    formData.set('mainImage', product.mainImage);
    formData.set('cardImage', product.cardImage);
    formData.set('cardHoverImage', product.cardHoverImage);
    formData.set('trending', `${product.trending ? 1 : 0}`);
    formData.set('category', product.category);
    formData.set('colors', JSON.stringify(product.colors));
    return iif(
      () => !id,
      this.http.post<void>(`/products${id ? `/${id}` : ''}`, formData),
      this.http.put<void>(`/products${id ? `/${id}` : ''}`, formData),
    );
  }
}
