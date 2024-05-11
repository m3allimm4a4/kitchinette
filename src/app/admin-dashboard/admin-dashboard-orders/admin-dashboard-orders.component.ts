import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Order } from '../../shared/models/order.interface';
import { OrderService } from '../../checkout/order.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard-orders',
  templateUrl: './admin-dashboard-orders.component.html',
  styleUrls: ['./admin-dashboard-orders.component.scss'],
  standalone: true,
  imports: [RouterLink, DatePipe],
})
export class AdminDashboardOrdersComponent implements OnInit {
  public orders: Order[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(orders => {
      this.orders = orders;
    });
  }
}
