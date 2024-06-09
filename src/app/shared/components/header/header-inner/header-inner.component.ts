import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../../models/category.interface';
import { InitializationService } from '../../../services/initialization/initialization.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header-inner',
  templateUrl: './header-inner.component.html',
  styleUrls: ['./header-inner.component.scss'],
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
})
export class HeaderInnerComponent implements OnInit, OnDestroy {
  @Input() currentPage = '';

  public categories: Category[] = [];
  public isAdminUser = false;

  private subscription = new Subscription();

  constructor(
    private initService: InitializationService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.initService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.authService.isAdminUser$().subscribe(isAdminUser => (this.isAdminUser = isAdminUser));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
