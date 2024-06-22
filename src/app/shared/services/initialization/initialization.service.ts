import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, switchMap, take } from 'rxjs';
import { Brand } from '../../models/brand.interface';
import { Category } from '../../models/category.interface';

@Injectable({
  providedIn: 'root',
})
export class InitializationService {
  private categories$ = new BehaviorSubject<Category[]>([]);
  private brands$ = new BehaviorSubject<Brand[]>([]);

  constructor(private http: HttpClient) {}

  public getAllCategories(): Observable<Category[]> {
    if (this.categories$.value.length !== 0) {
      return this.categories$.pipe(take(1));
    }

    return this.http.get<Category[]>('/categories').pipe(
      switchMap(categories => {
        this.categories$.next(categories);
        return this.categories$.pipe(take(1));
      }),
    );
  }

  public getCategoryDetails(categoryId: string): Observable<Category> {
    return this.categories$.pipe(
      filter(categories => categories.length !== 0),
      take(1),
      map(categories => {
        const category = categories.find(c => c._id === categoryId);
        if (category) {
          return category;
        }
        throw new Error('Category not found');
      }),
    );
  }

  public refreshCategories(): Observable<Category[]> {
    this.categories$.next([]);
    return this.getAllCategories();
  }

  public getAllBrands(): Observable<Brand[]> {
    if (this.brands$.value.length !== 0) {
      return this.brands$.pipe(take(1));
    }

    return this.http.get<Brand[]>('/brands').pipe(
      switchMap(brands => {
        this.brands$.next(brands);
        return this.brands$.pipe(take(1));
      }),
    );
  }
}
