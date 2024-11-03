import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { Product } from '../../shared/models/product.interface';
import { Category } from '../../shared/models/category.interface';
import { NgClass } from '@angular/common';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { RouterLink } from '@angular/router';
import { InitializationService } from '../../shared/services/initialization/initialization.service';
import { forkJoin } from 'rxjs';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-trending-items',
  templateUrl: './trending-items.component.html',
  styleUrls: ['./trending-items.component.scss'],
  standalone: true,
  imports: [NgClass, ProductCardComponent, RouterLink, CarouselModule],
  host: { ngSkipHydration: 'true' },
})
export class TrendingItemsComponent implements OnInit {
  public filteredTrendingItems: Product[] = [];
  public categories: Category[] = [];
  public activeCategory: Category = {} as Category;
  public showTab = false;
  public responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 4,
      numScroll: 4,
    },
    {
      breakpoint: '1220px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '1100px',
      numVisible: 2,
      numScroll: 2,
    },
  ];

  public trendingItems: Product[] = [];

  constructor(
    private homeService: HomeService,
    private initializationService: InitializationService,
  ) {}

  ngOnInit(): void {
    forkJoin([this.initializationService.getAllCategories(), this.homeService.getTrendingItems()]).subscribe(
      ([categories, trendingItems]) => {
        this.categories = categories;
        trendingItems.forEach(item => {
          const category = this.categories.find(c => c._id === item.category._id);
          if (!category) {
            this.categories.push(item.category);
          }
        });
        this.trendingItems = trendingItems;
        this.activeCategory = this.categories[0];
        this.filterTrendingItems();
      },
    );
  }

  switchCategory(category: Category) {
    this.activeCategory = category;
    this.filterTrendingItems();
  }

  private filterTrendingItems() {
    this.showTab = false;
    this.filteredTrendingItems = this.trendingItems.filter(item => item.category._id === this.activeCategory._id);
    this.showTab = true;
  }
}
