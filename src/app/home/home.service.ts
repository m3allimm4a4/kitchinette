import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../shared/models/product.interface';
import { Slider } from '../shared/models/slider.interface';
import { Banner } from '../shared/models/banner.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  public getTrendingItems(): Observable<Product[]> {
    return this.http.get<Product[]>('/products', {
      params: { trending: 1 },
    });
  }

  public getBanners(): Observable<Banner[]> {
    return this.http.get<Banner[]>('/banners');
  }

  public getSlider(): Observable<Slider[]> {
    return this.http.get<Slider[]>('/slider');
  }

  public updateBanner(banner: Banner): Observable<Banner> {
    const formData = new FormData();
    formData.set('title', banner.title);
    formData.set('subtitle', banner.subtitle);
    formData.set('link', banner.link);
    formData.set('imageFile', banner.imageFile as File);
    return this.http.put<Banner>(`/banners/${banner._id}`, formData);
  }

  public updateSlider(slider: Slider): Observable<Slider> {
    const formData = new FormData();
    formData.set('title', slider.title);
    formData.set('subtitle', slider.subtitle);
    formData.set('description', slider.description);
    formData.set('link', slider.link);
    formData.set('imageFile', slider.imageFile as File);
    return this.http.put<Slider>(`/slider/${slider._id}`, formData);
  }
}
