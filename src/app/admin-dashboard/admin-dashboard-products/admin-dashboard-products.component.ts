import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../shared/models/product.interface';
import { ProductListService } from '../../product-list/product-list.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard-products',
  templateUrl: './admin-dashboard-products.component.html',
  styleUrls: ['./admin-dashboard-products.component.scss'],
  standalone: true,
  imports: [RouterLink, DatePipe],
})
export class AdminDashboardProductsComponent implements OnInit {
  public products: Product[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private productList: ProductListService,
  ) {}

  ngOnInit(): void {
    this.refreshProducts();
  }

  public deleteProduct(product: Product): void {
    this.http.delete<void>(`/products/${product._id}`).subscribe(() => {
      this.refreshProducts();
    });
  }

  private refreshProducts(): void {
    this.productList.getProductList().subscribe(products => {
      this.products = products;
    });
  }
}
