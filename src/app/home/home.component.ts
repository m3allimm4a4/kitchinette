import { Component } from '@angular/core';
import { SliderComponent } from './slider/slider.component';
import { BannersComponent } from './banners/banners.component';
import { TrendingItemsComponent } from './trending-items/trending-items.component';
import { PoliciesComponent } from './policies/policies.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [SliderComponent, BannersComponent, TrendingItemsComponent, PoliciesComponent],
})
export class HomeComponent {}
