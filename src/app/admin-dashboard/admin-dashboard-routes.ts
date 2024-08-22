import { Routes } from '@angular/router';
import { AdminDashboardCategoriesDetailsComponent } from './admin-dashboard-categories/admin-dashboard-categories-details/admin-dashboard-categories-details.component';
import { AdminDashboardCategoriesComponent } from './admin-dashboard-categories/admin-dashboard-categories.component';
import { AdminDashboardHomeComponent } from './admin-dashboard-home/admin-dashboard-home.component';
import { AdminDashboardOrdersDetailsComponent } from './admin-dashboard-orders/admin-dashboard-orders-details/admin-dashboard-orders-details.component';
import { AdminDashboardOrdersComponent } from './admin-dashboard-orders/admin-dashboard-orders.component';
import { AdminDashboardProductsDetailsComponent } from './admin-dashboard-products/admin-dashboard-products-details/admin-dashboard-products-details.component';
import { AdminDashboardProductsComponent } from './admin-dashboard-products/admin-dashboard-products.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminDashboardColorsComponent } from './admin-dashboard-colors/admin-dashboard-colors.component';
import { AdminDashboardColorsDetailsComponent } from './admin-dashboard-colors/admin-dashboard-colors-details/admin-dashboard-colors-details.component';

export const ADMIN_DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: AdminDashboardHomeComponent,
      },
      {
        path: 'categories',
        component: AdminDashboardCategoriesComponent,
      },
      {
        path: 'categories/:id',
        component: AdminDashboardCategoriesDetailsComponent,
      },
      {
        path: 'colors',
        component: AdminDashboardColorsComponent,
      },
      {
        path: 'colors/:id',
        component: AdminDashboardColorsDetailsComponent,
      },
      {
        path: 'orders',
        component: AdminDashboardOrdersComponent,
      },
      {
        path: 'orders/:id',
        component: AdminDashboardOrdersDetailsComponent,
      },
      {
        path: 'products',
        component: AdminDashboardProductsComponent,
      },
      {
        path: 'products/:id',
        component: AdminDashboardProductsDetailsComponent,
      },
    ],
  },
];
