import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderShoppingListComponent } from './header-shopping-list/header-shopping-list.component';
import { InitializationService } from '../../../services/initialization/initialization.service';
import { Category } from '../../../models/category.interface';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../models/user.interface';
import { AuthService } from '../../../../auth/auth.service';
import { Subscription } from 'rxjs';
import { AvatarModule } from 'primeng/avatar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';

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
    NgbCollapse,
    NgOptimizedImage,
    AvatarModule,
    OverlayPanelModule,
    ButtonModule,
  ],
})
export class MiddleInnerComponent implements OnInit, OnDestroy {
  public user: User | null = null;
  public searchString = '';
  public cartItemCount = 0;
  public categories: Category[] = [];
  public navbarCollapsed = true;
  public categoriesCollapsed = true;
  public categoriesAngle = 'pi-angle-down';

  private subscription = new Subscription();

  constructor(
    private router: Router,
    private initService: InitializationService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.initService.getAllCategories().subscribe(categories => {
        this.categories = categories;
      }),
    );

    this.subscription.add(this.authService.getUser$().subscribe(user => (this.user = user)));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

  public logOut() {
    this.authService.logOut();
    this.navbarCollapsed = true;
  }
}
