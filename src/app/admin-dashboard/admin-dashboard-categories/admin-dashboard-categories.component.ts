import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Category } from '../../shared/models/category.interface';
import { InitializationService } from '../../shared/services/initialization/initialization.service';

@Component({
  selector: 'app-admin-dashboard-categories',
  templateUrl: './admin-dashboard-categories.component.html',
  styleUrls: ['./admin-dashboard-categories.component.scss'],
  standalone: true,
  imports: [RouterLink],
})
export class AdminDashboardCategoriesComponent implements OnInit {
  public categories: Category[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient,
    private initializationService: InitializationService,
  ) {}

  ngOnInit(): void {
    this.refreshCategories();
  }

  public deleteCategory(category: Category): void {
    this.http.delete<void>(`/categories/${category._id}`).subscribe(() => {
      this.refreshCategories();
    });
  }

  private refreshCategories(): void {
    this.initializationService.refreshCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
}
