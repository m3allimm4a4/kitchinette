import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../../shared/models/order.interface';
import { OrderService } from '../../../checkout/order.service';
import { of, switchMap } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard-orders-details',
  templateUrl: './admin-dashboard-orders-details.component.html',
  styleUrls: ['./admin-dashboard-orders-details.component.scss'],
  standalone: true,
  imports: [NgIf],
})
export class AdminDashboardOrdersDetailsComponent implements OnInit {
  public order: Order | undefined;
  public shipping = 4;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap(params => {
          const id = params.get('id');
          if (!id || id === 'new') return of(undefined);
          return this.orderService.getOrder(id);
        }),
      )
      .subscribe(order => (this.order = order));
  }
}
