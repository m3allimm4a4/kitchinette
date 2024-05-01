import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { Category } from '../../../models/category.interface';
import { InitializationService } from '../../../services/initialization/initialization.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header-inner',
  templateUrl: './header-inner.component.html',
  styleUrls: ['./header-inner.component.scss'],
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
})
export class HeaderInnerComponent implements OnInit {
  @Input() currentPage = '';

  public categories: Category[] = [];

  constructor(
    private initService: InitializationService,
    @Inject(PLATFORM_ID) private platformId: string,
  ) {}

  ngOnInit(): void {
    this.initService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
}
