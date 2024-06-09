import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FilterBy } from '../models/filter-by.enum';
import { Category } from '../../shared/models/category.interface';
import { Brand } from '../../shared/models/brand.interface';
import { InitializationService } from '../../shared/services/initialization/initialization.service';

@Component({
  selector: 'app-product-list-sidebar',
  templateUrl: './product-list-sidebar.component.html',
  styleUrls: ['./product-list-sidebar.component.scss'],
  standalone: true,
  imports: [RouterLink],
})
export class ProductListSidebarComponent implements OnInit {
  @Output() filter = new EventEmitter<FilterBy[]>();

  public categories: Category[] = [];
  public brands: Brand[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private initService: InitializationService,
  ) {}

  ngOnInit(): void {
    this.initService.getAllCategories().subscribe(data => {
      this.categories = data;
    });

    // this.initService.getAllBrands().subscribe(data => {
    //   this.brands = data;
    // });
  }

  public clearFilter() {
    this.router.navigate([], { relativeTo: this.activatedRoute }).then();
  }
}
