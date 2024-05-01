import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderShoppingListComponent } from './header-shopping-list/header-shopping-list.component';
import { InitializationService } from '../../../services/initialization/initialization.service';
import { Category } from '../../../models/category.interface';
import { NgClass, NgForOf, NgOptimizedImage } from '@angular/common';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-middle-inner',
  templateUrl: './middle-inner.component.html',
  styleUrls: ['./middle-inner.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    HeaderShoppingListComponent,
    RouterLink,
    RouterLinkActive,
    NgClass,
    NgForOf,
    NgbCollapse,
    NgOptimizedImage,
  ],
})
export class MiddleInnerComponent implements OnInit {
  public searchString = '';
  public cartItemCount = 0;
  public categories: Category[] = [];
  public navbarCollapsed = true;
  public categoriesCollapsed = true;
  public categoriesAngle = 'pi-angle-down';

  constructor(
    private router: Router,
    private initService: InitializationService,
  ) {}

  ngOnInit(): void {
    this.initService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  public onCategoriesClick() {
    this.categoriesAngle = this.categoriesCollapsed ? 'pi-angle-up' : 'pi-angle-down';
    this.categoriesCollapsed = !this.categoriesCollapsed;
  }

  public search() {
    if (this.searchString) {
      this.router.navigate(['/product-list'], { queryParams: { search: this.searchString } }).then();
      this.searchString = '';
    }
  }
}
