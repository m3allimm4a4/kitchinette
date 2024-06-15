import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../../shared/models/order.interface';
import { OrderService } from '../../../checkout/order.service';

@Component({
  selector: 'app-admin-dashboard-orders-details',
  templateUrl: './admin-dashboard-orders-details.component.html',
  styleUrls: ['./admin-dashboard-orders-details.component.scss'],
  standalone: true,
})
export class AdminDashboardOrdersDetailsComponent implements OnInit {
  public order: Order = {} as Order;
  public shipping = 4;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id || id === 'new') return;
      this.orderService.getOrder(id).subscribe(order => {
        this.order = order;
      });
    });
  }
}
